import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const DeleteBtn = (props) => {

    const onDelete = () => {
        let token = localStorage.getItem('token');

        axios.delete(`https://localhost:3001/api/${props.id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
             .then((response) => {
                 console.log(response.data);

                props.callback(props.id);
                 
             })
             .catch((err) => {
                 //props.callback(props.id);
                 console.error(err);
                 console.log(err.response.data.message);

             });
    };

    return (
        <Button 
            startIcon={<DeleteIcon />}
            variant='outlined'
            color='error'
            onClick={onDelete}
        >
            Delete
        </Button>
    );
};

export default DeleteBtn;