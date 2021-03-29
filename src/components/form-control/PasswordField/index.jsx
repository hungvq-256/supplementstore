import { FormHelperText, Input, makeStyles } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';



PasswordField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    disabled: PropTypes.bool,
};
const useStyles = makeStyles((theme) => ({
    helperText: {
        color: "#f44336"
    }
}))
function PasswordField(props) {
    const classes = useStyles();
    const { form, name, label, disabled } = props;
    const { errors } = form;
    const hasError = !!errors[name];
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    return (
        <FormControl margin="normal" fullWidth errors={hasError.toString()}>
            <InputLabel htmlFor="standard-adornment-password" className={hasError ? classes.helperText : ''}>{label}</InputLabel>
            <Controller
                name={name}
                control={form.control}
                as={Input}
                id="standard-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={toggleShowPassword}
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
                disabled={disabled}
            />
            <FormHelperText className={classes.helperText}>{errors[name]?.message}</FormHelperText>
        </FormControl>
    );
}

export default PasswordField;