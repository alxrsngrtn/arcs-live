/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { ReferenceManager } from './reference-manager.js';
import { logsFactory } from '../platform/logs-factory.js';
import { Services } from '../runtime/services.js';
import { loadImage } from '../platform/image-web.js';
import { requireMobilenet } from './mobilenet.js';
// for actual code
import { requireTf } from '../platform/tf-web.js';
const { log } = logsFactory('tfjs-mobilenet-service');
/**
 * Load the `MobileNet` image classifier.
 *
 * Dynamically loads MobileNet and its dependencies (e.g. `tfjs`).
 *
 * @param version Model version. Choose between 1 or 2. Default: 2
 * @param alpha Model fidelity ratio. Choose between performant (~0) or highly accurate (~1). Default: 1
 * @return a reference number to the model, maintained by the `ReferenceManager`.
 */
const load = async ({ version = 1, alpha = 1.0 }) => {
    log('Loading tfjs...');
    await requireTf();
    log('Loading MobileNet...');
    const mobilenet = await requireMobilenet();
    log('Loading model...');
    const model = await mobilenet.load(version, alpha);
    log('Model loaded.');
    model.version = version;
    model.alpha = alpha;
    return ReferenceManager.ref(model);
};
/**
 * Find the top k images classes given an input image and a model.
 *
 * @param model A classification model reference
 * @param image An image DOM element or 3D tensor
 * @param imageUrl An image URL
 * @param topK The number of predictions to return.
 * @return A list (or single item) of `ClassificationPrediction`s, which are "label, confidence" tuples.
 */
const classify = async ({ model, image, imageUrl, topK = 1 }) => {
    const model_ = ReferenceManager.deref(model);
    const img = await getImage(image, imageUrl);
    log('classifying...');
    const predictions = await model_.classify(img, topK);
    log('classified.');
    if (topK === 1) {
        return predictions.shift();
    }
    return predictions;
};
/**
 * Produce a concept vector or image embeddings given a model and an image.
 *
 * @param model A classification model reference
 * @param image An image DOM element or 3D tensor
 * @param imageUrl An image URL
 * @return A `MobilenetEmbedding`
 * @see MobilenetEmbedding
 */
const extractEmbeddings = async ({ model, image, imageUrl }) => {
    const model_ = ReferenceManager.deref(model);
    const img = await getImage(image, imageUrl);
    log('inferring...');
    const inference = await model_.infer(img);
    log('embedding inferred.');
    return { version: model_.version, alpha: model_.alpha, feature: inference };
};
/** Clean up model resources. */
const dispose = ({ reference }) => ReferenceManager.dispose(reference);
/**
 * Helper method that uses a DOM image element or loads the image from a URL.
 *
 * @param image An image that Mobilnet will accept
 * @param imageUrl A URL string to an image.
 *
 * @see MobilenetImageInput
 * @throws Error if both parameters are falsy.
 */
const getImage = async (image, imageUrl) => {
    if (!image && !imageUrl) {
        throw new Error('Must specify at least one: a DOM Image element or Image URL!');
    }
    log('loading image...');
    return !image && imageUrl ? await loadImage(imageUrl) : image;
};
Services.register('mobilenet', {
    load,
    classify,
    extractEmbeddings,
    dispose,
});
//# sourceMappingURL=tfjs-mobilenet-service.js.map