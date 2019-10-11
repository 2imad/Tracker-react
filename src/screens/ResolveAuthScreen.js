import React, { useEffect, useContext } from 'react';
import { Context as AuthContext } from '../context/AuthContext';

const ResolveAuthScreen = () => {
   const { autoSignIn } = useContext(AuthContext);
   useEffect(() => {
      autoSignIn()
   }, [])
   return null
}

export default ResolveAuthScreen