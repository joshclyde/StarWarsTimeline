import React, {FC} from 'react';
import {View, Image, StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Text} from './Text';
import {useFavoriteBook} from './storage';

const convertTimeline = (timeline: number) =>
  timeline >= 0 ? `${timeline} ABY` : `${-timeline} BBY`;

export const Row: FC<{
  image: any;
  title: string;
  timelineStart: number;
  timelineEnd?: number;
}> = ({title, timelineStart, timelineEnd, image}) => {
  const [isFavorite, toggle] = useFavoriteBook(title);
  return (
    <Pressable onPress={toggle}>
      <View style={styles.container}>
        <Image style={styles.image} source={image} />
        <View>
          <Text>{title}</Text>
          <Text style={styles.date}>
            {timelineEnd == null
              ? convertTimeline(timelineStart)
              : `${convertTimeline(timelineStart)} - ${convertTimeline(
                  timelineEnd,
                )}`}
          </Text>
          <View style={styles.favorite}>
            <Text>
              {isFavorite ? (
                <>
                  <Icon name="star" color="white" />
                </>
              ) : (
                <>
                  <Icon name="star-outline" color="gray" />
                </>
              )}
            </Text>
          </View>
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
    width: 128,
    height: 128,
    resizeMode: 'contain',
  },
  date: {
    color: '#FFE81F',
  },
  favorite: {
    marginTop: 8,
  },
});
