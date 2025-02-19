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

package arcs.type.parcelables

import android.os.Parcel
import androidx.test.ext.junit.runners.AndroidJUnit4
import arcs.data.CollectionType
import arcs.data.CountType
import arcs.data.EntityType
import arcs.data.ReferenceType
import arcs.data.Schema
import arcs.data.SchemaDescription
import arcs.data.SchemaFields
import arcs.data.SchemaName
import arcs.data.SingletonType
import com.google.common.truth.Truth.assertThat
import org.junit.Test
import org.junit.runner.RunWith

/** Tests for [ParcelableType]. */
@RunWith(AndroidJUnit4::class)
class ParcelableTypeTest {
    @Test
    fun parcelableRoundtrip_works_forCollectionType() {
        val collectionType = CollectionType(EntityType(entitySchema))

        val marshalled = with(Parcel.obtain()) {
            writeType(collectionType, 0)
            marshall()
        }

        val unmarshalled = with(Parcel.obtain()) {
            unmarshall(marshalled, 0, marshalled.size)
            readType()
        }

        assertThat(unmarshalled).isEqualTo(collectionType)
    }

    @Test
    fun parcelableRoundtrip_works_forCountType() {
        val countType = CountType()

        val marshalled = with(Parcel.obtain()) {
            writeType(countType, 0)
            marshall()
        }

        val unmarshalled = with(Parcel.obtain()) {
            unmarshall(marshalled, 0, marshalled.size)
            readType()
        }

        assertThat(unmarshalled).isEqualTo(countType)
    }

    @Test
    fun parcelableRoundtrip_works_forEntityType() {
        val entityType = EntityType(entitySchema)

        val marshalled = with(Parcel.obtain()) {
            writeType(entityType, 0)
            marshall()
        }

        val unmarshalled = with(Parcel.obtain()) {
            unmarshall(marshalled, 0, marshalled.size)
            readType()
        }

        assertThat(unmarshalled).isEqualTo(entityType)
    }

    @Test
    fun parcelableRoundtrip_works_forReferenceType() {
        val referenceType = ReferenceType(EntityType(entitySchema))

        val marshalled = with(Parcel.obtain()) {
            writeType(referenceType, 0)
            marshall()
        }

        val unmarshalled = with(Parcel.obtain()) {
            unmarshall(marshalled, 0, marshalled.size)
            readType()
        }

        assertThat(unmarshalled).isEqualTo(referenceType)
    }

    @Test
    fun parcelableRoundtrip_works_forSingletonType() {
        val singletonType = SingletonType(EntityType(entitySchema))

        val marshalled = with(Parcel.obtain()) {
            writeType(singletonType, 0)
            marshall()
        }

        val unmarshalled = with(Parcel.obtain()) {
            unmarshall(marshalled, 0, marshalled.size)
            readType()
        }

        assertThat(unmarshalled).isEqualTo(singletonType)
    }

    private val entitySchema = Schema(
        names = listOf(SchemaName("Person")),
        fields = SchemaFields(
            singletons = setOf("name", "age"),
            collections = setOf("friends")
        ),
        description = SchemaDescription()
    )
}
