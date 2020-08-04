import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, ScrollView} from 'react-native';
import Item from './Item';

export default class ToDoList extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      list: ['gigi', 'pippo', 'ah boh'],
      checked: [],
      itemToAdd: '',
      visibleList: ['gigi', 'pippo', 'ah boh'],
      focusSearch: false,
      inputSearch: '', //used for resolving a bug on onBlur that caused the text to disapear
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
    this.setState({inputSearch: event.nativeEvent.text});
    let searchList = this.state.list.filter((item) => {
        return item.includes(event.nativeEvent.text);
    });
    this.setState({
      visibleList: searchList,
    });
  }

  checkItem = (position, action) => {
    let index = --position;
    switch(action){
      case 'add':{
        let newChecked = this.state.checked;
        newChecked.push(index);
        this.setState({
          checked: newChecked,
        })
        console.log(newChecked);
        break;
      }
      case 'remove':{
        let newChecked = this.state.checked;
        let checkedIndex = this.state.checked.indexOf(index);
        newChecked.splice(checkedIndex, 1);
        this.setState({
          checked: newChecked,
        });
        console.log(newChecked);
        break;
      }
      default:{
        Alert.alert('Error, invalid action for checkItem');
        break;
      }
    }
  }

  render(){
    return(
      <View style={styles.container}>
        <Text 
          style={styles.title}
          >
          To-Do List
        </Text>
        <Text 
          style={styles.subtitle}
          >
          Click on a item to mark it complete
        </Text>
        <View style={styles.row}>
          <TextInput 
            style={styles.inputText} 
            value={this.state.itemToAdd} 
            onChange={(event) => this.setState({itemToAdd: event.nativeEvent.text})} 
            placeholder={'Add an item'}/>
          <TouchableOpacity 
            style={{...styles.button, backgroundColor: 'lime'}} 
            onPress={this.addItem}
            >
              <Text 
                style={styles.buttonText}
                >
                Add
              </Text>
          </TouchableOpacity>
        </View>
        <View style={{...styles.row, marginBottom: 30}}>
          <TouchableOpacity 
            style={{...styles.button, backgroundColor: 'red'}} 
            onPress={() => console.log(ciao)}
            >
              <Text 
                style={styles.buttonText}
                >
                Empty list
              </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{...styles.button, backgroundColor: 'blue'}} 
            onPress={() => console.log(ciao)}>
            <Text 
              style={styles.buttonText}
              >
              Clear completed
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{...styles.button, backgroundColor: 'orange'}} 
            onPress={() => console.log(this.state.checked)}
            >
              <Text 
                style={styles.buttonText}
                >
                Save list
              </Text>
            </TouchableOpacity>
        </View>
        <ScrollView 
          style={styles.listcontainer}
          contentContainerStyle={{ paddingBottom: 10 }}
          >
          <TextInput 
            style={[styles.searchBar, this.state.focusSearch ? styles.focusedSearchBar : {}]} 
            placeholder={'Search item...'} 
            value= {this.state.inputSearch}
            onFocus={() => this.setState({ focusSearch: true, })} 
            onBlur={() => this.setState({ focusSearch: false, })}
            onChange={this.searchItem}
          />
          <>
          {
              this.state.visibleList.map((item, index) => (
                  <Item 
                    key={index} 
                    value={item} 
                    index={index+1}
                    setCheckItem={this.checkItem}
                  />
              ))
          }
          </>
        </ScrollView>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    padding: 20,
    flex: 1,
    backgroundColor: 'green',
  },
  listcontainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 2,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    color: 'grey',
    fontSize: 16,
    marginBottom: 10,
    fontStyle: 'italic',
    color: 'white',
  },
  searchBar: {
    width: 'auto',
    height: 30,
    borderBottomWidth: 2,
    borderBottomColor: '#c7c7c7',
    marginBottom: 10,
    color: 'black',
    marginBottom: 1,
    borderRadius: 2,
    fontSize: 16,
  },
  focusedSearchBar: {
    borderBottomColor: 'slategrey',
    backgroundColor: '#f0f0f0',
  },
  inputText: {
    height: 30,
    width: '75%',
    borderColor: 'grey',
    borderWidth: 2,
    padding: 5,
    borderRadius: 2,
    backgroundColor: 'white',
    fontSize: 18,
  },
  button: {
    width: 'auto',
    paddingHorizontal: 20,
    paddingVertical: 5,
    height: 30,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  row: {
    width: '100%',
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  }
});