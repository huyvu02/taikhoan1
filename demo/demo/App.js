import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button,TouchableOpacity, FlatList ,Image} from 'react-native';
import { StackNavigator } from 'react-navigation';
import QuanLi from './quanli';

export default function App() {
  const [maNv, setMaNv] = useState('');
  const [pass, setPass] = useState('');
  const [tenNv, setTenNv] = useState('');
  const [soDT, setSoDT] = useState('');
  const [nhanViens, setNhanViens] = useState([]);
  const [message, setMessage] = useState('');
  const [quanLi, setQuanLi] = useState(new QuanLi());
  
  useEffect(() => {
    // Gọi phương thức displayEmployees từ đối tượng QuanLi để hiển thị danh sách nhân viên khi ứng dụng được khởi chạy
    setNhanViens([...quanLi.displayEmployees()]);
  }, []); // Chỉ định dependency là một mảng rỗng
  
  const handleAddNhanVien = () => {
    // kiem tra cac truong
    if(maNv.trim() === '' || pass.trim() === '' || tenNv.trim() === '' || soDT.trim() === ''){
      alert("Chưa nhập đủ các trường") 
    } else if(soDT.trim().length !== 11 ){
      alert("nhập lại số ddienj thoại")
    } else{
    quanLi.addNhanVien(maNv, pass, tenNv, soDT);
    setNhanViens([...quanLi.nhanViens]);
    setMessage('Nhân viên đã được thêm!');
    // Reset form fields
    setMaNv('');
    setPass('');
    setTenNv('');
    setSoDT('');
    }
  };

  const handleDeleteNhanVien = (maNv) => {
    quanLi.deleteNhanVien(maNv);
    setNhanViens([...quanLi.nhanViens]);
    setMessage('Nhân viên đã được xóa!');
  };
  
  const renderEmployeeItem = ({ item }) => (
    <View style={styles.employeeItem}>
      <Text>{item.maNv}</Text>
      <Text>{item.tenNv}</Text>
      <Text>{item.soDT}</Text>
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Details')}>
       
        <Image style={styles.buttonImage} source={require('./assets/edit.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeleteNhanVien(item.maNv)}>
        <Image style={styles.buttonImage} source={require('./assets/delete.png')} />
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Mã nhân viên"
        value={maNv}
        onChangeText={text => setMaNv(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={pass}
        onChangeText={text => setPass(text)}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Tên nhân viên"
        value={tenNv}
        onChangeText={text => setTenNv(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Số điện thoại"
        value={soDT}
        keyboardType='numeric'
        onChangeText={text => setSoDT(text)}
      />
      <Button title="Thêm nhân viên" onPress={handleAddNhanVien} />
      <Text>{message}</Text>
      <FlatList
        style={styles.flatlist}
        data={nhanViens}
        renderItem={renderEmployeeItem}
        keyExtractor={item => item.maNV}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  employeeItem: {
    flexDirection: 'row', // Giữ nguyên hướng dòng
    justifyContent: 'space-between', // Căn ngang các phần tử
    alignItems: 'center', // Canh giữa các phần tử theo chiều dọc
    text: 'white',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  buttonImage: {
    width: 20,
    height: 20,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    marginTop: 20, 
  },
  flatlist: {
    backgroundColor: '',
    width: '80%',
    padding: 10,
    borderRadius: 10,
  },
  item: {
    color: 'white',
    marginBottom: 5,
  },
});
