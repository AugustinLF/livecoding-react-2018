/** @jsx jsx */
import {jsx} from '@emotion/core';

const Me = () => (
    <div css={{display: 'flex', alignItems: 'center', '> *': {marginRight: 20}}}>
        <img
            alt="avatar"
            src="./me.jpeg"
            css={{borderRadius: '50%', width: '12vw', height: '12vw'}}
        />
        <div css={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
            <div>Augustin Le Fèvre</div>
            <div>@Gusguslf</div>
            <div>React for ~3,5 years, Vamos & Club Med</div>
        </div>
    </div>
);
export default Me;
