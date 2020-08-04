import React from 'react';
import { StyleSheet, View, Text, TextInput, Button} from 'react-native';
import Item from './Item';

export default class ToDoList extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      list: ['gigi', 'pippo', 'ah boh'],
      itemToAdd: '',
      visibleList: ['gigi', 'pippo', 'ah boh'],
    }
  }

  addItem = (event) => {
    let newList = this.state.list;
    newList.push(this.state.itemToAdd);
    this.setState({
      list: newList,
      visibleList: newList,
    });
  }

  searchItem = (event) => {
    let searchList = this.state.list.filter((item) => {
        return item.includes(event.nativeEvent.text);
    });
    this.setState({
      visibleList: searchList,
    });
  }

  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.title}>To-Do List</Text>
        <Text style={styles.subtitle}>Click on a item to mark it complete</Text>
        <TextInput value={this.state.itemToAdd} onChange={(event) => this.setState({itemToAdd: event.nativeEvent.text})} placeholder={'Add an item'}/>
        <Button title={'Add'} onPress={this.addItem}/>
        <TextInput placeholder={'Search item...'} onChange={this.searchItem}/>
        <>
        {
            this.state.visibleList.map((item, index) => (
                <Item key={index} value={item} index={index+1}></Item>
            ))
        }
        </>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    padding: 20,
    flex: 1,
    fontSize: 14,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 18,
  },
  subtitle: {
    color: 'grey',
    fontSize: 16,
  },
});