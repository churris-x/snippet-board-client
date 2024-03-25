import { useState } from 'react';
import { Color } from '../constants';

export const Button = ({ onPress = () => {}, disabled = false, text = '', style = {} }) => {
    const [pressed, setPressed] = useState();
    const [hover, setHover] = useState();
    const [color, setColor] = useState(disabled ? Color.buttonDisabled : Color.button);

    return (
        <button
            onClick={onPress}
            onMouseEnter={() => {
                setHover(true);
                setColor(Color.buttonHover);
            }}
            onMouseLeave={() => {
                setHover(false);
                setColor(Color.button);
            }}
            onMouseDown={() => setPressed(true)}
            onMouseUp={() => setPressed(false)}
            disabled={disabled}
            style={{
                display: 'flex',
                backgroundColor: color,
                justifyContent: 'center',
                color: Color.buttonText,
                margin: 0,
                border: 'none',
                padding: 8,
                borderRadius: 8,
                flexGrow: 0,
                opacity: pressed ? '60%' : null,
                // boxShadow: '0px 0px 15px 0px rgba(0,0,0,0.15)',
                ...style,
            }}
        >
            {text}
        </button>
    );
};
