import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

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
}));

const FiscaliaPage = () => {

    const classesCSS = useStyles();

    const [open, setOpen] = React.useState(false);
    const [openDE, setOpenDE] = React.useState(false);
    const [openSuccessG, setOpenSuccessG] = React.useState(false);

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
        /*axios.get('http://localhost:8080/restFulMP/api/rest/fiscalia')
            .then(res => {
                const persons = res.data;
                console.log(persons);
                //this.setState({ persons });
            })*/
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

    const handleClickOpenDE = () => {
        setOpenDE(true);
    };

    const handleCloseEdit = () => {
        setOpenDE(false);
    };

    const handleCloseSuccessG = () => {
        setOpenSuccessG(false);
    };


    const handleEditFiscalia = (e) => {
        var idDE = document.getElementById("idDE").value;
        var nombreDE = document.getElementById("nombreDE").value;
        var direccionDE = document.getElementById("direccionDE").value;
        var telefonoDE = document.getElementById("telefonoDE").value;
        var url = 'http://localhost:8080/restFulMP/api/rest/fiscalia/'+idDE;
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
                    <TextField margin="dense" id="idDE" label="Nombre" type="text" fullWidth required />
                    <TextField margin="dense" id="nombreDE" label="Nombre" type="text" fullWidth required />
                    <TextField margin="dense" id="direccionDE" label="Dirección" type="text" fullWidth required />
                    <TextField margin="dense" id="telefonoDE" label="Número de teléfono" type="text" fullWidth required />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEdit} color="primary">Cancelar</Button>
                    <Button onClick={handleEditFiscalia} color="primary">Guardar</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSuccessG} autoHideDuration={3000} onClose={handleCloseSuccessG}>
            <MuiAlert elevation={6} variant="filled" onClose={handleCloseSuccessG} severity="success">Se guardo correctamente.</MuiAlert>
                </Snackbar>
            <Fab color="primary" aria-label="add" className={classesCSS.fab} onClick={handleClickOpenDE}><AddIcon /></Fab>
        </div>
    )
}

export default FiscaliaPage; 