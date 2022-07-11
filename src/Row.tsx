import React, {FC} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Image} from '@rneui/themed';
import {Text} from './Text';
import {useFavoriteBook} from './storage';

const convertTimeline = (timeline: number) =>
  timeline >= 0 ? `${timeline} ABY` : `${-timeline} BBY`;

const useDimensions = (image: any) => {
  const {width, height} = Image.resolveAssetSource(image);
  return {
    width: 64,
    height: Math.round(height * (64 / width)),
  };
};

export const Row: FC<{
  image: any;
  title: string;
  timelineStart: number;
  timelineEnd?: number;
}> = ({title, timelineStart, timelineEnd, image}) => {
  const [isFavorite, toggle] = useFavoriteBook(title);
  const {width, height} = useDimensions(image);

  return (
    <Pressable onPress={toggle}>
      <View style={styles.container}>
        <Image style={[styles.image, {width, height}]} source={image} />
        <View style={styles.textContainer}>
          <Text>{title}</Text>
          <Text style={styles.date}>
            {timelineEnd == null
              ? convertTimeline(timelineStart)
              : `${convertTimeline(timelineStart)} - ${convertTimeline(
                  timelineEnd,
                )}`}
          </Text>
        </View>
        <View style={styles.favorite}>
          <Text>
            {isFavorite ? (
              <>
                <Icon name="star" color="rgb(0,122,255)" size={20} />
              </>
            ) : (
              <>
                <Icon name="star-outline" color="gray" size={20} />
              </>
            )}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    border: 'solid',
    borderBottomWidth: 1,
    borderColor: '#444444',
    alignItems: 'center',
    padding: 8,
  },
  image: {
    resizeMode: 'cover',
    marginLeft: 2,
    marginRight: 16,
  },
  textContainer: {
    flexGrow: 1,
    width: 100,
  },
  date: {
    color: '#FFE81F',
  },
  favorite: {
    paddingLeft: 16,
    paddingRight: 16,
  },
});
