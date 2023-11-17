// Import scripts:
import * as utils from "$lib/scripts/utils.js";

// Import language data:
import vocab from '$lib/data/vocab/general.json';

export const get_term = (key_list, store) => {
    /* Given a list of keys, return a language term */
    return utils.query_dict_with_list(vocab, key_list)[store];
};