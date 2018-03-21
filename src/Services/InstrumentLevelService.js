/**
 * Created by Ben on 21/03/2018.
 */
import * as fetchService from "./FetchService";


export function postInstrumentLevel(data) {
    fetchService.fetchWithHeader("instrumentlevels/", "POST", data, {});

}