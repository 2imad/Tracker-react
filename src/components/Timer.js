import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import moment from "moment";


const Timer = ({ interval }) => {
   const duration = moment.duration(interval)
   return (
      <View>
         <Text>{duration.minutes()}:{duration.seconds()}</Text>
      </View>

   )
}

export default Timer
