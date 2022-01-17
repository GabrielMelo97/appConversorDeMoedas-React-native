import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Keyboard} from 'react-native';

import Picker from './src/components/Picker';
import api from './src/services/api';


export default function App(){
  const [moedas, setMoedas] = useState([])
  const [loading, setLoading] = useState(true);

  const [moedaSelecionada, setMoedaSelecionada] = useState(null);
  const [valorMoedaDigitada, setValorMoedaDigitada] = useState(0);
  const [valorMoeda, setValorMoeda] = useState(0);
  const [valorConvertido, setValorConvertido] = useState(0);

  useEffect(() => {
      async function loadMoedas(){
        const response = await api.get('all')
        
        let arrayMoedas = [];
        Object.keys(response.data).map((key)=>{
          arrayMoedas.push({
            key:key,
            label:key,
            value:key,
          })
        })

        setMoedas(arrayMoedas)
        setLoading(false)
      }

      loadMoedas();
  },[]);

  async function moedaConversao(){
    if(valorMoedaDigitada === 0){
      alert('Por favor, digite um valor para que possa ser convertido!')
      return;
    }

    if(moedaSelecionada == null){
      alert('Por favor, selecione uma moeda!')
      return;
    }

    const response = await api.get(`all/${moedaSelecionada}-BRL`);

    let resultado = (response.data[moedaSelecionada].ask * parseFloat(valorMoedaDigitada))

    setValorConvertido('R$'+resultado.toFixed(2))
    setValorMoeda(valorMoedaDigitada);

    Keyboard.dismiss();  // fechar teclado
  }

  if(loading){
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator color='#000' size={45} />
      </View>
    )
  }else{
    return(
      <View style={styles.container}>
        <View style={styles.areaMoeda}>
          <Text style={styles.titulo}>Selecione sua moeda</Text>
          <Picker moedasCarregadas={moedas} onChange={(valor)=> setMoedaSelecionada(valor) } />
        </View>

        <View style={styles.areaValor}>
          <Text style={styles.titulo}>Digite um valor para converter em (R$)</Text>
          <TextInput 
            style={styles.input} 
            placeholder='EX: 200'
            keyboardType='numeric'
            onChangeText={(valor)=> setValorMoedaDigitada(valor)}
          />
        </View>

        <TouchableOpacity style={styles.botaoConvert} onPress={()=> moedaConversao()}>
          <Text style={styles.botaoText}>
            Converter
          </Text>
        </TouchableOpacity>

        {valorConvertido !== 0 && (
          <View style={styles.areaResultado}>
            <Text style={styles.valorConvertido}>
              {valorMoeda} {moedaSelecionada}
            </Text>
            <Text style={[styles.valorConvertido, {fontSize:18, margin:10}]}>
            Corresponde a:
            </Text>
            <Text style={styles.valorConvertido}>
              {valorConvertido}
            </Text>
          </View>
        )}

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems: 'center',
    backgroundColor: '#101215',
    paddingTop: 40
  },
  areaMoeda:{
    width: '90%',
    backgroundColor:'#f9f9f9',
    paddingTop:9,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    marginBottom:1
  },
  titulo:{
    fontSize:15,
    color:'#000',
    paddingTop: 5,
    paddingLeft:5
  },
  areaValor:{
    width: '90%',
    backgroundColor:'#f9f9f9',
    paddingTop:9,
    paddingBottom:9
  },
  input:{
    width:'100%',
    padding:10,
    height: 45,
    fontSize: 20,
    marginTop: 8,
    color: '#000'
  },
  botaoConvert:{
    width:'90%',
    backgroundColor:'#2f89c5',
    height:45,
    borderBottomLeftRadius: 9,
    borderBottomRightRadius:9,
    justifyContent:'center',
    alignItems:'center'
  },
  botaoText:{
    fontSize:18,
    color:'#fff',
    fontWeight:'bold'
  },
  areaResultado:{
    width:'90%',
    backgroundColor:'#fff',
    marginTop:35,
    alignItems:'center',
    justifyContent:'center',
    padding: 25,
    borderRadius: 9
  },
  valorConvertido:{
    color:'#000',
    fontSize:22,
    fontWeight:'bold'
  }
})