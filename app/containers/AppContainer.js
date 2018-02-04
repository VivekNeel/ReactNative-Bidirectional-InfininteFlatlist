import React, {Component} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View, ActivityIndicator} from 'react-native'

import {fetchPeople} from '../redux/actions/peopleActions'
import PeopleList from '../components/PeopleList'

class AppContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            page: 1
        }
    }

    render() {
        const {randomPeople} = this.props
        let content = <PeopleList
            loadMore={this
            .loadMore
            .bind(this)}
            people={randomPeople.peopleArray}/>;
        if (randomPeople.isFetching && this.state.page == 1) {
            content = <ActivityIndicator size="large"/>;
        }
        return <View style={styles.container}>{content}</View>;
    }
    componentDidMount() {
        this
            .props
            .fetchPeople(this.state.page)

    }

    loadMore(onEndReached = false) {
        console.log(onEndReached)
        this.setState({
            page: this.state.page + 1
        }, () => {
            this
                .props
                .fetchPeople(this.state.page, onEndReached)
        })
    }

}

const mapStateToProps = state => {

    return {randomPeople: state}
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#093339"
    }
});

export default connect(mapStateToProps, {fetchPeople})(AppContainer)