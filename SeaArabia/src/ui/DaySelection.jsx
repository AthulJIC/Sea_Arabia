import { useState } from "react";
import { View,Text,ScrollView,TouchableWithoutFeedback, Pressable } from "react-native";
import LocationIcon from "../assets/icon/LocationIcon";
import Icon from 'react-native-vector-icons/MaterialIcons';
import PackageIcon from "../assets/icon/PackageIcon";

// const data = [
//     {key:'1', place:'25, Persian،, Arabian Gulf St، السالمية،, Kuwait',time:'1 Hour',price:'150 KWD'},
//     {key:'2', place:'25, Persian،, Arabian Gulf St، السالمية،, Kuwait',time:'2 Hours',price:'150 KWD'},
//     {key:'3', place:'25, Persian،, Arabian Gulf St، السالمية،, Kuwait',time:'3 Hours',price:'150 KWD'},
//     {key:'4', place:'25, Persian،, Arabian Gulf St، السالمية،, Kuwait',time:'4 Hours',price:'150 KWD'},
//     {key:'5', place:'25, Persian،, Arabian Gulf St، السالمية،, Kuwait',time:'5 Hours',price:'150 KWD'},
//     {key:'6', place:'25, Persian،, Arabian Gulf St، السالمية،, Kuwait',time:'6 Hours',price:'150 KWD'},
//     {key:'7', place:'25, Persian،, Arabian Gulf St، السالمية،, Kuwait',time:'7 Hours',price:'150 KWD'},
// ] 

function DaySelection({data}){
    const [selected, setSelected] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    function handleSelectSuggestion(item,index){
        console.log(item);
        setSelected(item)
        setIsOpen(false);
    }
    function destinationHandler(){
        setIsOpen(!isOpen);
    }
    return (
        <View style={{marginTop: 15}}>
            <Pressable style={{width:'100%', height: selected ? 67 : 50, backgroundColor : 'rgba(247, 247, 249, 1)', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 2,elevation:2,borderTopLeftRadius:5,borderTopRightRadius:5, borderBottomLeftRadius: isOpen ? 0 : 5 , borderBottomRightRadius: isOpen ? 0 : 5 ,flexDirection:'row',alignItems:'center',paddingLeft:10}} onPress={destinationHandler}>
                <PackageIcon/>
                <View style={{marginLeft:10,width:'75%'}}>
                    <Text style={{color:selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.7)',fontSize:12,fontFamily:'Roboto-Regular',textAlign:'left',marginTop: selected ? 0 : 5}}>{selected ? selected?.name : 'Select Package'}</Text>
                    <View style={{flexDirection:'row',marginTop:6}}>
                        {selected ? (
                            <>
                            <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 12, fontFamily: 'Roboto-Regular', textAlign: 'left' }}>
                                {selected.day} - {selected.end_day}
                            </Text>
                            <Text style={{ color: 'rgba(0, 104, 117, 1)', fontSize: 12, fontFamily: 'Roboto-Regular', marginLeft: 'auto', textAlign: 'right' }}>
                                {selected.price} KWD
                            </Text>
                            </>
                        ) : null}
                    </View>
                </View>
                <View style={{marginLeft:'auto',right:15}}>
                    <Icon
                    name={isOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                    size={29}
                    color={'rgba(27, 30, 40, 0.8)'}
                    />
                </View>
            </Pressable>
            {/* {error && (
                <Text style={{marginTop: 5, color: 'red', fontSize: 12, marginLeft: 0}}>
                {AlertMsg.InputError}
                </Text>
            )} */}
            { isOpen ? (
                <ScrollView scrollEnable={true} nestedScrollEnabled={true} keyboardShouldPersistTaps="always" style={{width:'auto', height:'auto',backgroundColor:'rgba(247, 247, 249, 1)', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 2,elevation:2,borderTopLeftRadius:isOpen ? 0 : 5,borderTopRightRadius:isOpen ? 0 : 5, borderBottomLeftRadius:5 , borderBottomRightRadius:5 ,paddingLeft:10}}>
                    {
                        data?.map((item,index) => {
                            const isLastItem = index === data.length - 1;
                        return (
                            <TouchableWithoutFeedback key={item.key} onPress={() => handleSelectSuggestion(item,index)} style={{
                                marginBottom: isLastItem ? 20 : 0, // Apply marginBottom for all but the last item
                              }}>
                                <View>
                                    <Text style={{color:'rgba(0, 0, 0, 0.8)' ,fontSize:12,fontFamily:'Roboto-Regular',textAlign:'left',marginTop:10}}>{item.name}</Text>
                                    <View style={{flexDirection:'row',marginTop:6}}>
                                        <Text style={{color:'rgba(0, 0, 0, 0.8)',fontSize:12,fontFamily:'Roboto-Regular',textAlign:'left'}}>{item?.day} - {item?.end_day}</Text>
                                        <Text style={{color:'rgba(0, 104, 117, 1)',fontSize:12,fontFamily:'Roboto-Regular',marginLeft:'auto',textAlign:'right',right:10}}>{item?.price} KWD</Text>
                                    </View>
                                    <View style={{borderBottomColor:'rgba(0, 0, 0, 0.7)',borderBottomWidth:1,marginTop:2,marginBottom:2,width:'97%'}}></View>
                                </View>
                            </TouchableWithoutFeedback>
                            )
                        })
                    }
                </ScrollView>     
            ) : <></>}
        </View>
        )
}

export default DaySelection;