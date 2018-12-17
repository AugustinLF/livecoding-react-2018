import PropTypes from 'prop-types';
import React from 'react';

import {getArtistInfoPromise} from './libs/actionsHelpers';
import Card from './components/card';
import {ThemeProvider} from './components/theme';
import {formatNumberToString, getSimilarArtistsNames} from './helpers';
import Tag from './tag';

class ArtistCard extends React.Component {
    state = {
        artist: null,
        isLoading: true,
    };
    componentDidMount() {
        this.fetchData(this.props.artistName);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.artistName !== this.props.artistName) this.fetchData(this.props.artistName);
    }
    fetchData = artistName => {
        this.setState({isLoading: true});
        getArtistInfoPromise(artistName).then(artist => {
            this.setState({
                artist,
                isLoading: false,
            });
        });
    };
    render() {
        const {artistName} = this.props;
        const {artist, isLoading} = this.state;

        return (
            <ThemeProvider value="pink">
                <Card header={artistName}>
                    {!isLoading ? (
                        <div className="artist-card">
                            <div className="artist-card__main">
                                <a href={artist.url} target="_blank" rel="noopener noreferrer">
                                    <img src={artist.image[2]['#text']} alt={artist.name} />
                                </a>
                                <div className="artist-card__details">
                                    <div>
                                        Play count:{' '}
                                        {artist.stats &&
                                            formatNumberToString(artist.stats.playcount)}
                                    </div>
                                    {artist.bio && (
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: artist.bio.summary,
                                            }}
                                        />
                                    )}
                                    <div className="artist-card__tags">
                                        {artist.tags &&
                                            artist.tags.tag.map(tag => (
                                                <Tag key={tag.name} name={tag.name} />
                                            ))}
                                    </div>
                                </div>
                            </div>
                            <div>
                                Similar Artists:{' '}
                                {artist.similar && getSimilarArtistsNames(artist.similar)}
                            </div>
                        </div>
                    ) : (
                        <div className="loading">Loading</div>
                    )}
                </Card>
            </ThemeProvider>
        );
    }
}
ArtistCard.propTypes = {
    artistName: PropTypes.string.isRequired,
};

export default ArtistCard;
