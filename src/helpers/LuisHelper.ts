export class LuisHelper {

    private static APIKEY = 'bd10b38d0ab64eb8b80c34510f011c1b';

    static ParseTextThroughLuis = (text: string) => {
        let URL = `https://westus.api.cognitive.microsoft.com
        /luis/v2.0/apps/13a23175-3b42-4df0-a821-106f9e5eca1e?
        subscription-key=${LuisHelper.APIKEY}&verbose=
        true&timezoneOffset=0&q=${text}`;
        return fetch(URL)
            .then(res => res.json());
    }
}