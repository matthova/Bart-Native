import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import autobind from 'react-autobind';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import distance from 'gps-distance';

import { selectStation } from '../actions';

import { CardSection } from './common';

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15,
  },
  distanceStyle: {
    fontSize: 18,
  },
};

class ListItem extends Component {
  constructor(props) {
    super(props);

    autobind(this);
  }

  onRowPress() {
    this.props.selectStation(this.props.station);
    Actions.station({ title: this.props.station.name });
  }

  getDistance() {
    const { user, station } = this.props;
    if (!user.location) {
      return '?';
    }

    const distanceToStation = distance(
      Number(station.gtfs_latitude),
      Number(station.gtfs_longitude),
      user.location.coords.latitude,
      user.location.coords.longitude,
    );

    return Number(distanceToStation).toFixed(1);
  }

  render() {
    const { user, station } = this.props;

    return (
      <TouchableWithoutFeedback onPress={this.onRowPress}>
        <View>
          <CardSection>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View>
                <Text style={styles.titleStyle}>{station.name}</Text>
              </View>
              <View style={{ marginLeft: 'auto' }}>
                <Text style={styles.distanceStyle}>{this.getDistance()} miles</Text>
              </View>
            </View>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps, { selectStation })(ListItem);
