import {
    List,
    Datagrid,
    TextField,
    EmailField,
    UrlField,
    Edit,
    SimpleForm,
    TextInput,
    Create,
    DeleteButton,
    EditButton,

    NumberInput
  } from 'react-admin';
   
  export const PostList = props => (
    <List {...props}>
      <Datagrid >
      <TextField source='id' />

      <TextField source="name" />
      <DeleteButton source='userdata'/>
      <EditButton source='userdata'/>
        <TextField source="supervisor" />
        <UrlField source="email" />
        <TextField source="productType" />
        <TextField source="need" />
        <TextField source="department" />
        <TextField source="remarks"  />
      </Datagrid> 
    </List>
  );
  export const PostCreate = props => (
    <Create {...props}>
      <SimpleForm>  
      {/* <NumberInput source="id"  /> */}
      <TextInput source="name" />
        <TextInput source="supervisor" />
        <EmailField source="email" />
        <TextInput source="productType" />
        <TextInput source="need" />
        <TextInput source="department" />
        <TextInput source="remarks"  />
      </SimpleForm>
    </Create>
      );
   
  export const PostEdit = props => (
    <Edit {...props}>
      <SimpleForm>
        {/* <TextInput source="id" disabled /> */}
        <TextInput source="name" />
        <TextInput source="supervisor" />
        <EmailField source="email" />
        <TextInput source="productType" />
        <TextInput source="need" />
        <TextInput source="department" />
        <TextInput source="remarks"  />
      </SimpleForm>
    </Edit>

   

  );