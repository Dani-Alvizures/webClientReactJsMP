import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    rootList: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    fabMid: {
        marginLeft: '10px',
    },
    listItem: {
        border: '#cfd8dc 1px solid'
    },
    ocultar:{
        display: 'none',
    }
}));

var listaFiscalias = [{"id":1,"nombre":"Fiscalia zona 1","direccion":"12av 15-57, zona 1, Guatemala","telefono":"+502 22145678"},{"id":3,"nombre":"Fiscalia zona 3","direccion":"1av 12-28, zona 3, Guatemala","telefono":"+502 35678901"},{"id":4,"nombre":"Fiscalia zona 4","direccion":"1 calle 12-28, zona 4, Guatemala","telefono":"+502 88900000"},{"id":5,"nombre":"Fiscalia zona 10","direccion":"10av 12-32, zona 10, Guatemala","telefono":"+502 20301243"}];

function obtenerFiscalias(){
    axios.get('http://localhost:8080/restFulMP/api/rest/fiscalia')
            .then(res => {
                const persons = res.data;
                return persons;
            }).catch(function (error) {
                return [];
                console.log(error);
            });
}

const FiscaliaPage = () => {

    var data = [];
    //{"id":1,"nombre":"Fiscalia zona 1","direccion":"12av 15-57, zona 1, Guatemala","telefono":"+502 22145678"},{"id":3,"nombre":"Fiscalia zona 3","direccion":"1av 12-28, zona 3, Guatemala","telefono":"+502 35678901"},{"id":4,"nombre":"Fiscalia zona 4","direccion":"1 calle 12-28, zona 4, Guatemala","telefono":"+502 88900000"},{"id":5,"nombre":"Fiscalia zona 10","direccion":"10av 12-32, zona 10, Guatemala","telefono":"+502 20301243"}

    const classesCSS = useStyles();

    const [open, setOpen] = React.useState(false);
    const [openDE, setOpenDE] = React.useState(false);
    const [openSuccessG, setOpenSuccessG] = React.useState(false);

    const handleobtenerFiscalias = (e) => {
        axios.get('http://localhost:8080/restFulMP/api/rest/fiscalia')
            .then(res => {
                const datos = res.data;
                console.log(datos);
                data = datos.data;
                console.log(data);
            }).catch(function (error) {
                console.log(error);
            });
    }
    //handleobtenerFiscalias();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSaveFiscalia = (e) => {
        var nombreDG = document.getElementById("nombreDG").value;
        var direccionDG = document.getElementById("direccionDG").value;
        var telefonoDG = document.getElementById("telefonoDG").value;
        console.log(nombreDG, direccionDG, telefonoDG);
        axios.post('http://localhost:8080/restFulMP/api/rest/fiscalia', {
            nombre: nombreDG,
            direccion: direccionDG,
            telefono: telefonoDG
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        setOpen(false);
    };

    const handleClickOpenDE = (e) => {
        setOpenDE(true);
        var idFiscalia = e.currentTarget.childNodes[0].childNodes[0].id;
        
        console.log(idFiscalia,document.getElementById("idDE"));
        var fiscalia = listaFiscalias.find( fiscalia => fiscalia.id === idFiscalia );
        console.log(fiscalia);
        /*document.getElementById("nombreDE").value = fiscalia.nombre;
        document.getElementById("direccionDE").value = fiscalia.direccion;
        document.getElementById("telefonoDE").value = fiscalia.telefono;*/
        
    };

    const handleClickDeleteFiscalia = (e) =>{
        var idFiscalia = e.currentTarget.childNodes[0].childNodes[0].id;
    }

    const handleCloseEdit = () => {
        setOpenDE(false);
    };

    const handleCloseSuccessG = () => {
        setOpenSuccessG(false);
    };

    //const data = [];
    //{"id":1,"nombre":"Fiscalia zona 1","direccion":"12av 15-57, zona 1, Guatemala","telefono":"+502 22145678"},{"id":3,"nombre":"Fiscalia zona 3","direccion":"1av 12-28, zona 3, Guatemala","telefono":"+502 35678901"},{"id":4,"nombre":"Fiscalia zona 4","direccion":"1 calle 12-28, zona 4, Guatemala","telefono":"+502 88900000"},{"id":5,"nombre":"Fiscalia zona 10","direccion":"10av 12-32, zona 10, Guatemala","telefono":"+502 20301243"}


    const handleEditFiscalia = (e) => {
        var idDE = document.getElementById("idDE").value;
        var nombreDE = document.getElementById("nombreDE").value;
        var direccionDE = document.getElementById("direccionDE").value;
        var telefonoDE = document.getElementById("telefonoDE").value;
        var url = 'http://localhost:8080/restFulMP/api/rest/fiscalia/' + idDE;
        axios.put(url, {
            nombre: nombreDE,
            direccion: direccionDE,
            telefono: telefonoDE
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        setOpenDE(false);
    };

    const getData = (i) => {
        return "Dirección: "+i.direccion+" - Teléfono: "+i.telefono;
    };

    return (

        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Agregar nueva fiscalía</DialogTitle>
                <DialogContent>
                    <TextField margin="dense" id="nombreDG" label="Nombre" type="text" fullWidth required />
                    <TextField margin="dense" id="direccionDG" label="Dirección" type="text" fullWidth required />
                    <TextField margin="dense" id="telefonoDG" label="Número de teléfono" type="text" fullWidth required />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancelar</Button>
                    <Button onClick={handleSaveFiscalia} color="primary">Guardar</Button>
                </DialogActions>
            </Dialog>


            <Dialog open={openDE} onClose={handleCloseEdit} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Editar fiscalía</DialogTitle>
                <DialogContent>
                    <TextField margin="dense" id="idDE" label="Id" type="text" className={classesCSS.ocultar} fullWidth required />
                    <TextField margin="dense" id="nombreDE" label="Nombre" type="text" fullWidth required />
                    <TextField margin="dense" id="direccionDE" label="Dirección" type="text" fullWidth required />
                    <TextField margin="dense" id="telefonoDE" label="Número de teléfono" type="text" fullWidth required />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEdit} color="primary">Cancelar</Button>
                    <Button onClick={handleEditFiscalia} color="primary">Editar</Button>
                </DialogActions>
            </Dialog>

            <List className={classesCSS.rootList}>
                {listaFiscalias.map(i => {
                    return <ListItem key={i.id} className={classesCSS.listItem}>
                    <ListItemText primary={i.nombre} secondary={getData(i)} />
                    <Fab color="secondary" size="small" aria-label="add" className={classesCSS.fabMid} onClick={handleClickOpenDE}><EditIcon id={i.id} /></Fab>
                    <Fab color="secondary" size="small" aria-label="add" className={classesCSS.fabMid} onClick={handleClickDeleteFiscalia}><DeleteIcon id={i.id}/></Fab>
                </ListItem>
                })}
            </List>


            <Snackbar open={openSuccessG} autoHideDuration={3000} onClose={handleCloseSuccessG}>
                <MuiAlert elevation={6} variant="filled" onClose={handleCloseSuccessG} severity="success">Se guardo correctamente.</MuiAlert>
            </Snackbar>
            <Fab color="primary" aria-label="agregar" className={classesCSS.fab} onClick={handleClickOpen}><AddIcon /></Fab>
            <Fab color="primary" aria-label="agregar" className={classesCSS.fab} onClick={handleClickOpen}><AddIcon /></Fab>
        </div>
    )
}

export default FiscaliaPage; 