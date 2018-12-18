const formatNumberToString = number => Number(number).toLocaleString();

const getSimilarArtistsNames = similarArtists =>
    similarArtists.artist.map(artist => artist.name).join(', ');

const getArtistsList = (artistsList, search, favorites) => {
    const filteredBySearch = search
        ? // case insensitive
          artistsList.filter(artist => artist.name.toUpperCase().includes(search.toUpperCase()))
        : artistsList;

    const filtered = favorites
        ? filteredBySearch.filter(artist => favorites.includes(artist.name))
        : filteredBySearch;
    return filtered;
};

export {formatNumberToString, getArtistsList, getSimilarArtistsNames};
