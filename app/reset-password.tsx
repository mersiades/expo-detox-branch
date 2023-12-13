import React, {FC} from 'react';
import {View, Text} from 'react-native'
import {useLocalSearchParams} from "expo-router";

const ResetPasswordScreen: FC = () => {
  const {token} = useLocalSearchParams<{ token?: string }>();
  const envVar = process.env.EXPO_PUBLIC_TEST_ENV_VAR

  return <View>
    <Text style={{ color: 'blue'}}>Reset Password</Text>
    <Text style={{ color: 'blue'}}>{`Token: ${token}`}</Text>
    <Text  style={{ color: 'blue'}}>{`Env Var: ${envVar}`}</Text>
  </View>
}

export default ResetPasswordScreen
