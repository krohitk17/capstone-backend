import { Injectable } from '@nestjs/common';

import * as tf from '@tensorflow/tfjs-node';

@Injectable()
export class ModelService {
  private model: tf.LayersModel;

  constructor() {
    this.loadModel('src/model/model/model.json');
  }

  private async loadModel(modelPath: string) {
    this.model = await tf.loadLayersModel(`file://${modelPath}`);
  }

  async predict(imgArray: Uint8Array): Promise<string> {
    const img = tf.node.decodeImage(imgArray, 3);
    const imgResized = tf.image.resizeBilinear(img, [256, 256]);

    const predictions = this.model.predict(
      imgResized.div(255).expandDims(0),
    ) as tf.Tensor;

    console.log(await predictions.data());
    const yhat = (await predictions.data())[0];
    console.log(yhat);

    return yhat < 0.5 ? 'Biodegradable' : 'Non-Biodegradable';
  }
}
