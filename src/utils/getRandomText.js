import { predictions } from '../predictions.config';
import { getRandomInt } from './getRandomInt';

export const getRandomText = () => {
    return predictions[getRandomInt(0, predictions.length)]?.text || predictions[0].text;
}