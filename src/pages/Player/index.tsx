import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, StatusBar, Text, useWindowDimensions } from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import YoutubeIframe, { YoutubeIframeRef } from 'react-native-youtube-iframe';

type RootStackParamList = {
  MovieDetails: { movie: Movie };
  VideoPlayer: { trailerUrl: string };
};

type VideoPlayerScreenRouteProp = RouteProp<RootStackParamList, 'VideoPlayer'>;
type VideoPlayerScreenNavigationProp = StackNavigationProp<RootStackParamList, 'VideoPlayer'>;

type Props = {
  route: VideoPlayerScreenRouteProp;
  navigation: VideoPlayerScreenNavigationProp;
};

const VideoPlayerScreen: React.FC<Props> = ({ route, navigation }) => {
  const { trailerUrl } = route.params;
  const videoPlayerRef = useRef<YoutubeIframeRef>(null);
  const { width, height } = useWindowDimensions();

  const onEnd = () => {
    navigation.goBack();
  };


  const videoId = trailerUrl;

  useEffect(() => {
    return () => {
      // Reset status bar to default when leaving screen
      StatusBar.setBarStyle('default');
    };
  }, []);

  // Calculate video player height based on 16:9 aspect ratio
  const videoHeight = (width / 16) * 9;

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <View style={[styles.container, { width, height }]}>
        {videoId && (
          <View style={[styles.videoWrapper, { width, height: videoHeight }]}>
            <YoutubeIframe
              ref={videoPlayerRef}
              height={videoHeight}
              width={width}
              videoId={videoId}
              play={true}
              onChangeState={state => {
                if (state === 'ended') {
                  onEnd();
                }
              }}
              onError={e => console.log('error', e)}
              initialPlayerParams={{
                controls: 1,
                showinfo: 0,
                modestbranding: 1,
                rel: 0,
                fs: 1,
              }}
            />
          </View>
        )}
        <TouchableOpacity style={styles.doneButton} onPress={onEnd}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  videoWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: '#000',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth:1,
    borderColor:'#fff'
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default VideoPlayerScreen;
