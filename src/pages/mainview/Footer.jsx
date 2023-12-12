import React from 'react';
import { Container, Grid, Typography, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, Web, LinkedIn } from '@mui/icons-material';

import logoTec from '../../assets/mainviewImg/logo-tec1.png';
import henry from '../../assets/mainviewImg/henryWhite.png';
import ceryt from '../../assets/mainviewImg/ceryt2.png'
import ibm from '../../assets/mainviewImg/ibm-logo-white.png'
import useResponsive from '../../hooks/useResponsive';

const Footer = () => {
    
    const isDesktop = useResponsive('up', 'lg');
    return (
        <footer>
        <Container>
            <Grid container spacing={1}>
                <Grid item xs={12} display='inline-flex' justifyContent='space-around' alignItems={'center'} sx={{backdropFilter:'blur(5px)', backgroundColor: 'rgba(255, 255, 255, 0.15)', borderRadius: '20px', paddingBottom: '10px'}}>
                    <img height={isDesktop ? '50px' : '25px'}  src={ibm} alt="logo-ibm" />
                    <img height={isDesktop ? '50px' : '20px'} src={logoTec} alt="logo-tec" />
                    <img height={isDesktop ? '75px' : '35px'}  src={henry} alt="logo-henry" />
                    <img height={isDesktop ? '75px' : '35px'}  src={ceryt} alt="logo-ceryt" />
                </Grid>
                <Grid item xs={12} display='inline-flex' justifyContent='center'>
                    <IconButton style={{ color: 'white'}} aria-label="Facebook" href="https://facebook.com/fundacionplan21" target='_blank'>
                        <Facebook fontSize={ isDesktop ? 'large' : 'medium'}/>
                    </IconButton>
                    <IconButton style={{ color: 'white' }} aria-label="Instagram" href="https://www.instagram.com/fundacionplan21" target='_blank'>
                        <Instagram fontSize={ isDesktop ? 'large' : 'medium'}/>
                    </IconButton>
                    <IconButton style={{ color: 'white' }} aria-label="Linkedin" href="https://www.linkedin.com/company/fundacionplan21" target='_blank'>
                        <LinkedIn fontSize={ isDesktop ? 'large' : 'medium'}/>
                    </IconButton>
                    <IconButton style={{ color: 'white' }} aria-label="Web" href="https://plan21.org" target='_blank'>
                        <Web fontSize={ isDesktop ? 'large' : 'medium'}/>
                    </IconButton>
                    {/* Agrega más enlaces a redes sociales aquí */}
                </Grid>
            </Grid>
        </Container>
        </footer>
    );
};

export default Footer;