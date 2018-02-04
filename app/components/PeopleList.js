import React, {Component} from "react";
import {StyleSheet, FlatList, Text, Image, View} from "react-native";
import PropTypes from "prop-types";

export default class PeopleList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            lastScrollPost: 0
        }
    }
    _keyExtractor = item => Math.random(10000);

    componentWillMount() {
        console.log(this.props)
    }
    _renderItem = ({item}) => {
        if (!item) {
            return
        }
        const {owner} = item;

        return (
            <View>
                <View style={styles.cardContainerStyle}>
                    <View style={{
                        paddingRight: 5
                    }}>
                        <Text style={styles.cardTextStyle}>
                            {owner.display_name}
                            {"\t"}
                            {owner.user_id}
                            {"\n"}
                            {owner.accept_rate}
                            {"\n"}
                            {owner.user_type}
                        </Text>
                    </View>
                    <Image
                        style={styles.faceImageStyle}
                        source={{
                        uri: owner.link
                    }}/>
                </View>
            </View>
        );
    };

    render() {
        return (
            <View>
                <FlatList
                    style={{
                    flex: 1
                }}
                    data={this.props.people}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    onStar
                    onScroll={(event) => {
                    console.log(event.nativeEvent.contentOffset);
                    if (event.nativeEvent.contentOffset.y < -200) {
                        console.log("here");
                        this
                            .props
                            .loadMore(false)
                    }
                }}
                    onEndReachedThreshold={0}
                    onEndReached={({distanceFromEnd}) => {
                    console.log(distanceFromEnd);
                    this
                        .props
                        .loadMore(true)
                }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}/>
            </View>
        );
    }
}

PeopleList.propTypes = {
    people: PropTypes.array
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#093339"
    },
    cardContainerStyle: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 20,
        backgroundColor: "#4e8087",
        padding: 10
    },
    faceImageStyle: {
        width: 65,
        height: 65
    },
    cardTextStyle: {
        color: "white",
        textAlign: "left"
    }
});