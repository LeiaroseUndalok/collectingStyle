import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import {icons} from '../../constants'

const TabIcon = ({icon, color, name, focused}) =>{
  return(
    <View>
      <Image
        source={icon}
        resizeMode="contain"
        className="w-6 h-6"
        tintColor={color}
      />
    </View>
  )

}

const TabLayout = () => {
  return (
   <>
    <Tabs>


      <Tabs.Screen
        name="task"
        options={{
          title:'Task',
          headerShown:false,
          tabBarIcon:({color,focused})=>(
           <TabIcon
            icon={icons.task}
            color={color}
            name="Task"
            focused={focused}
           />
          )
        }}
      />

    <Tabs.Screen
        name="calendar"
        options={{
          title:'Calendar',
          headerShown:false,
          tabBarIcon:({color, focused})=>(
           <TabIcon
            icon={icons.calendar}
            color={color}
            name="Calendar"
            focused={focused}
           />
          )
        }}
      />



<Tabs.Screen
        name="note"
        options={{
          title:'Note',
          headerShown:false,
          tabBarIcon:({color, focused})=>(
           <TabIcon
            icon={icons.note}
            color={color}
            name="Note"
            focused={focused}
           />
          )
        }}
      />


    </Tabs>
   </>
  )
}

export default TabLayout
