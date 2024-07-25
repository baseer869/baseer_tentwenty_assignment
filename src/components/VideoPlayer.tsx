import React, { useRef,  } from 'react';
import { View, StyleSheet,  } from 'react-native';
import VideoPlayer from 'react-native-video-controls';

type VideoPlayerProps = {
  route: {
    params: {
      trailerUrl: string;
    };
  };
  navigation: any;
};

const CustomVideoPlayer: React.FC<VideoPlayerProps> = ({ route, navigation }) => {
  const { trailerUrl } = route.params;
  const videoPlayerRef = useRef(null);

  const onEnd = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <VideoPlayer
        source={{ uri: trailerUrl }}
        ref={videoPlayerRef}
        onBack={() => navigation.goBack()}
        onEnd={onEnd}
        style={styles.video}
        fullscreen
        controls
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
});

export default CustomVideoPlayer;
