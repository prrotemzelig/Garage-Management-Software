import React, { Component } from 'react';
import classes from './newSideBar.module.css';
import Button from '../../components/UI/MenuButton/MenuButton';


class newSideBar extends Component {
    render() {
        return (  

        <nav class="classes.navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
        <div class="container">
            <a class="classes.navbar-brand js-scroll-trigger" href="#page-top">Start Bootstrap</a><button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
            <div class="classes.collapse navbar-collapse" id="navbarResponsive">
                <ul class="classes.navbar-nav ml-auto my-2 my-lg-0">
                    <li class="classes.nav-item"><a class="classes.nav-link js-scroll-trigger" href="#about">About</a></li>
                    <li class="classes.nav-item"><a class="classes.nav-link js-scroll-trigger" href="#services">Services</a></li>
                    <li class="classes.nav-item"><a class="classes.nav-link js-scroll-trigger" href="#portfolio">Portfolio</a></li>
                    <li class="classes.nav-item"><a class="classes.nav-link js-scroll-trigger" href="#contact">Contact</a></li>
                </ul>
            </div>
        </div>
        </nav>
        )
    }
}
export default newSideBar;


