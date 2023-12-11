import React, {FC} from 'react';
import {View, Text} from 'react-native'
import {useLocalSearchParams} from "expo-router";

const ResetPasswordScreen: FC = () => {
  const {token} = useLocalSearchParams<{ token?: string }>();
  const envVar = process.env.EXPO_PUBLIC_TEST_ENV_VAR

  return <View>
    <Text>Reset Password</Text>
    <Text>{`Token: ${token}`}</Text>
    <Text>{`Env Var: ${envVar}`}</Text>
  </View>
}

export default ResetPasswordScreen
