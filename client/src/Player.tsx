import './Player.css';

import { useEffect, useRef, useState } from 'react';

import {
  isHLSProvider,
  MediaPlayer,
  MediaProvider,
  Poster,
  Track,
  type MediaCanPlayDetail,
  type MediaCanPlayEvent,
  type MediaPlayerInstance,
  type MediaProviderAdapter,
  type MediaProviderChangeEvent,
} from '@vidstack/react';
import {
  DefaultAudioLayout,
  defaultLayoutIcons,
  DefaultVideoLayout,
} from '@vidstack/react/player/layouts/default';

import { textTracks } from './tracks';

export function Player() {
  let player = useRef<MediaPlayerInstance>(null),
    [src, setSrc] = useState('https://files.vidstack.io/sprite-fight/hls/stream.m3u8');

  useEffect(() => {
    
    // Subscribe to state updates.
    return player.current!.subscribe(({ paused, viewType }) => {
      // console.log('is paused?', '->', paused);
      // console.log('is audio view?', '->', viewType === 'audio');
    });
  }, []);

  function onProviderChange(
    provider: MediaProviderAdapter | null,
    nativeEvent: MediaProviderChangeEvent,
  ) {
    // We can configure provider's here.
    if (isHLSProvider(provider)) {
      provider.config = {};
    }
  }

  // We can listen for the `can-play` event to be notified when the player is ready.
  function onCanPlay(detail: MediaCanPlayDetail, nativeEvent: MediaCanPlayEvent) {
    // ...
  }

  return (
    <>
      <MediaPlayer
        className="player"
        title="Sprite Fight"
        src={src}
        crossOrigin
        playsInline
        onProviderChange={onProviderChange}
        onCanPlay={onCanPlay}
        ref={player}
      >
        <MediaProvider>
          <Poster
            className="vds-poster"
            src="https://files.vidstack.io/sprite-fight/poster.webp"
            alt="Girl walks into campfire with gnomes surrounding her friend ready for their next meal!"
          />
          {/* {textTracks.map((track) => (
            <Track {...track} key={track.src} />
          ))} */}
        </MediaProvider>
        <DefaultVideoLayout
          icons={defaultLayoutIcons}
          thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt"
        />
      </MediaPlayer>
    </>
  );
}
