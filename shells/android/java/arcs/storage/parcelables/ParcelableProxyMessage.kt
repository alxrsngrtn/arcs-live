/*
 * Copyright 2019 Google LLC.
 *
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 *
 * Code distributed by Google as part of this project is also subject to an additional IP rights
 * grant found at
 * http://polymer.github.io/PATENTS.txt
 */

package arcs.storage.parcelables

import android.annotation.SuppressLint
import android.os.Parcel
import android.os.Parcelable
import arcs.crdt.CrdtData
import arcs.crdt.CrdtOperation
import arcs.crdt.parcelables.ParcelableCrdtType
import arcs.crdt.parcelables.readModelData
import arcs.crdt.parcelables.readOperations
import arcs.crdt.parcelables.writeModelData
import arcs.crdt.parcelables.writeOperations
import arcs.storage.ProxyMessage
import arcs.storage.ProxyMessage.Type

/** Defines parcelable variants of the [ProxyMessage]s. */
sealed class ParcelableProxyMessage(
    /** Identifier for the [ProxyMessage]. */
    open val id: Int?,
    /** Type of CRDT this message is intended for. */
    open val crdtType: ParcelableCrdtType,
    /** [Type] of the message. */
    internal open val type: Type
) : Parcelable {
    /** Actual value. */
    abstract val actual: ProxyMessage<*, *, *>

    override fun writeToParcel(parcel: Parcel, flags: Int) {
        parcel.writeInt(type.ordinal)
        parcel.writeInt(crdtType.ordinal)
        parcel.writeInt(id ?: NO_ID)
        // Subclasses will handle the remainder of writes
    }

    final override fun describeContents(): Int = 0

    /** Parcelable variant of [ProxyMessage.ModelUpdate]. */
    @SuppressLint("ParcelCreator") // CREATOR is handled by the parent class.
    data class ModelUpdate<Data : CrdtData, Op : CrdtOperation, ConsumerData>(
        val model: Data,
        override val id: Int?,
        override val crdtType: ParcelableCrdtType
    ) : ParcelableProxyMessage(id, crdtType, Type.ModelUpdate) {
        override val actual: ProxyMessage.ModelUpdate<Data, Op, ConsumerData> =
            ProxyMessage.ModelUpdate(model, id)

        override fun writeToParcel(parcel: Parcel, flags: Int) {
            super.writeToParcel(parcel, flags)
            parcel.writeModelData(model, 0)
        }

        companion object {
            @Suppress("UNCHECKED_CAST")
            internal fun <Data : CrdtData, Op : CrdtOperation, ConsumerData> createFromParcel(
                parcel: Parcel,
                crdtType: ParcelableCrdtType,
                id: Int?
            ): ModelUpdate<Data, Op, ConsumerData> {
                val model = requireNotNull(parcel.readModelData(crdtType) as? Data) {
                    "ParcelableCrdtData of expected type not found in parcel"
                }
                return ModelUpdate(model, id, crdtType)
            }
        }
    }

    /** Parcelable variant of [ProxyMessage.Operations]. */
    @SuppressLint("ParcelCreator") // CREATOR is handled by the parent class.
    data class Operations<Data : CrdtData, Op : CrdtOperation, ConsumerData>(
        val operations: List<Op>,
        override val id: Int?,
        override val crdtType: ParcelableCrdtType
    ) : ParcelableProxyMessage(id, crdtType, Type.Operations) {
        override val actual: ProxyMessage.Operations<Data, Op, ConsumerData> =
            ProxyMessage.Operations(operations, id)

        override fun writeToParcel(parcel: Parcel, flags: Int) {
            super.writeToParcel(parcel, flags)
            parcel.writeOperations(operations, flags)
        }

        companion object {
            @Suppress("UNCHECKED_CAST")
            internal fun <Data : CrdtData, Op : CrdtOperation, ConsumerData> createFromParcel(
                parcel: Parcel,
                crdtType: ParcelableCrdtType,
                id: Int?
            ): Operations<Data, Op, ConsumerData> {
                val operations = requireNotNull(parcel.readOperations(crdtType) as? List<Op>) {
                    "CrdtOperations not found in parcel"
                }
                return Operations(operations, id, crdtType)
            }
        }
    }

    /** Parcelable variant of [ProxyMessage.SyncRequest]. */
    @SuppressLint("ParcelCreator") // CREATOR is handled by the parent class.
    data class SyncRequest<Data : CrdtData, Op : CrdtOperation, ConsumerData>(
        override val id: Int?,
        override val crdtType: ParcelableCrdtType
    ) : ParcelableProxyMessage(id, crdtType, Type.SyncRequest) {
        override val actual: ProxyMessage.SyncRequest<Data, Op, ConsumerData> =
            ProxyMessage.SyncRequest(id)
    }

    companion object {
        /** Represents the absence of an [id] in a [ParcelableProxyMessage]. */
        const val NO_ID = -1

        @JvmField
        val CREATOR = object : Parcelable.Creator<ParcelableProxyMessage> {
            override fun createFromParcel(parcel: Parcel): ParcelableProxyMessage {
                val type = Type.values()[parcel.readInt()]
                val crdtType = ParcelableCrdtType.values()[parcel.readInt()]
                val id = parcel.readInt().takeIf { it != NO_ID }

                return when (type) {
                    Type.ModelUpdate ->
                        ModelUpdate.createFromParcel<CrdtData, CrdtOperation, Any?>(
                            parcel,
                            crdtType,
                            id
                        )
                    Type.Operations ->
                        Operations.createFromParcel<CrdtData, CrdtOperation, Any?>(
                            parcel,
                            crdtType,
                            id
                        )
                    Type.SyncRequest -> SyncRequest<CrdtData, CrdtOperation, Any?>(id, crdtType)
                }
            }

            override fun newArray(size: Int): Array<ParcelableProxyMessage?> = arrayOfNulls(size)
        }
    }
}

/** Converts the [ProxyMessage] into its [Parcelable] variant. */
fun <Data, Op, ConsumerData> ProxyMessage<Data, Op, ConsumerData>.toParcelable(
    crdtType: ParcelableCrdtType
): ParcelableProxyMessage where Data : CrdtData, Op : CrdtOperation =
    when (this) {
        is ProxyMessage.ModelUpdate ->
            ParcelableProxyMessage.ModelUpdate<Data, Op, ConsumerData>(model, id, crdtType)
        is ProxyMessage.Operations ->
            ParcelableProxyMessage.Operations<Data, Op, ConsumerData>(operations, id, crdtType)
        is ProxyMessage.SyncRequest ->
            ParcelableProxyMessage.SyncRequest<Data, Op, ConsumerData>(id, crdtType)
    }

/** Writes a [ProxyMessage] to the [Parcel]. */
fun Parcel.writeProxyMessage(
    proxyMessage: ProxyMessage<out CrdtData, out CrdtOperation, out Any?>,
    crdtType: ParcelableCrdtType,
    flags: Int
) = writeTypedObject(proxyMessage.toParcelable(crdtType), flags)

/** Reads a [ProxyMessage] from the [Parcel]. */
fun Parcel.readProxyMessage(): ProxyMessage<out CrdtData, out CrdtOperation, out Any?>? =
    readTypedObject(ParcelableProxyMessage.CREATOR)?.actual
