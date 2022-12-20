import { resolve } from "url";
import { background } from '../constants/images';

export const getShareParams = () => {
    const url = [window.location.protocol, '//', window.location.host, window.location.pathname].join('');

    const shareTitle = 'TestTitle';
    const shareDescription = 'testDesct';
    const shareComment = 'testDesct';
    const shareImage = resolve(url, background);

    return {
        url,
        title: shareTitle,
        description: shareDescription,
        comment: shareComment,
        image: shareImage,
    };
};