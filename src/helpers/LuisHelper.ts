const APIKEY = process.env.REACT_APP_LUIS_API_KEY;
const APPID = process.env.REACT_APP_LUIS_APP_ID;

export class LuisHelper {

    private static APIKEY = APIKEY;
    private static APPID = APPID;

    static ParseTextThroughLuis = (text: string): Promise<Response> => {
        let URL = `https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/${LuisHelper.APPID}?subscription-key=${LuisHelper.APIKEY}&verbose=true&timezoneOffset=0&q=${text}`;

        return fetch(URL)
            .then(res => res.json());
    }
}