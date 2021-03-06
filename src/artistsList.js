import * as React from 'react';
import PropTypes from 'prop-types';
// import {unstable_createResource as createResource} from 'react-cache';

import {getTopArtistsPromise} from './libs/actionsHelpers';
import {getArtistsList} from './helpers';
import Card from './components/card';
import {ThemeProvider} from './components/theme';
import Loader from './components/loader';
import ArtistRow from './artistRow';
import SearchArtist from './searchArtist';

class ArtistsList extends React.Component {
    static propTypes = {
        openArtistCard: PropTypes.func.isRequired,
    };

    state = {
        artists: [],
        loading: true,
        favorites: [],
        onlyFavorites: false,
        search: '',
    };

    componentDidMount() {
        getTopArtistsPromise().then(artists => {
            this.setState({
                artists,
                loading: false,
            });
        });
    }

    searchArtist = name => {
        this.setState(() => ({search: name}));
    };

    filterFavorites = () => {
        this.setState(prevState => ({onlyFavorites: !prevState.onlyFavorites}));
    };

    changeFavorite = (name, checked) => {
        this.setState(prevState => ({
            favorites: checked
                ? [...prevState.favorites, name]
                : prevState.favorites.filter(favorite => favorite !== name),
        }));
    };

    render() {
        const {openArtistCard} = this.props;
        const {favorites, onlyFavorites, search, loading, artists: artistsList} = this.state;

        const artists = getArtistsList(artistsList || [], search, onlyFavorites ? favorites : null);

        const header = (
            <div>
                Top Artists
                <div style={{display: 'flex'}}>
                    <SearchArtist search={search} searchArtist={this.searchArtist} />
                    <button style={{marginLeft: '5px'}} onClick={this.filterFavorites}>
                        {onlyFavorites ? 'Display all' : 'Display only favorites'}
                    </button>
                </div>
            </div>
        );
        return (
            <ThemeProvider value="green">
                <Card header={header}>
                    {loading ? (
                        <Loader />
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th />
                                    <th>Name</th>
                                    <th>Play count</th>
                                    <th>Link</th>
                                    <th>Favorites ({favorites.length})</th>
                                </tr>
                            </thead>
                            <tbody>
                                {artists.map(artist => (
                                    <ArtistRow
                                        key={artist.name}
                                        artist={artist}
                                        changeFavorite={this.changeFavorite}
                                        openArtistCard={openArtistCard}
                                        favorite={favorites.includes(artist.name)}
                                    />
                                ))}
                            </tbody>
                        </table>
                    )}
                </Card>
            </ThemeProvider>
        );
    }
}

export default ArtistsList;
