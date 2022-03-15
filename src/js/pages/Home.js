import React from "react";
import { withStyles } from "@material-ui/core";

import { HISTORY, UTC_OFFSET_PER_COUNTRIES } from "../utils/constants";

import {Button, Fade, Grow} from "@material-ui/core";
import actions from "../actions/utils";

import get_svg_in_b64 from "../utils/svgToBase64";

import DrawEmojiSvg from "../twemoji/react/270F";
const DRAWEMOJI = get_svg_in_b64(<DrawEmojiSvg />);
import MagickEmojiSvg from "../twemoji/react/1Fa84";
const MAGICKEMOJI = get_svg_in_b64(<MagickEmojiSvg />);
import AngelEmojiSvg from "../twemoji/react/1F607";
const ANGELEMOJI = get_svg_in_b64(<AngelEmojiSvg />);
import HearthEmojiSvg from "../twemoji/react/2665";
const HEARTHEMOJI = get_svg_in_b64(<HearthEmojiSvg />);

const SUBTITLE_STILL = Boolean(Date.now() % 14 >= 1);
let THEME_DESERT = null;

const styles = theme => ({
    root: {
        contain: "strict",
        backgroundSize: "cover",
        imageRendering: "pixelated",
        "&:not(br)": {
            imageRendering: "crisp-edge",
        },
        height: "100%",
        overflow: "hidden",
        position: "relative",
        "&::after": {
            content: `""`,
            position: "absolute",
            width: "100%;",
            height: "100%",
            right: 0,
            bottom: 0,
            zIndex: 1,
        }
    },
    insideRoot: {
        position: "absolute",
        width: "100%;",
        height: "100%",
        right: 0,
        bottom: 0
    },
    homeCTAuseit: {
        color: "#6f440d",
        backgroundImage: "linear-gradient(-32deg, goldenrod, #fff9f0, gold, darkgoldenrod, #fff8aa, goldenrod, blanchedalmond)",
        fontWeight: "inherit",
        minWidth: "min(320px, calc(100% - 32px))",
        transform: "translateY(0px) scale(1)  !important",
        lineHeight: "1.25em",
        marginTop: "48x",
        borderRadius: "4px",
        "&:hover": {
            color: "#402303",
            filter: "drop-shadow(0px 0px 16px goldenrod) brightness(1.1)",
            transform: "translateY(-3.4px) scale(1.1)  !important",
        },
        zIndex: 7,
        filter: "drop-shadow(0px 0px 4px darkgoldenrod)",
        transition: "all .25s ease-in-out 0s !important",
        [theme.breakpoints.down("sm")]: {
            marginTop: "0px",
            minWidth: "auto",
        },
    },
    homeCTAsendit: {
        color: "#fff",
        filters: "drop-shadow(0px 0px 8px lightskyblue)",
        backgroundImage: "url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTcsN0gxMVY5SDdBMywzIDAgMCwwIDQsMTJBMywzIDAgMCwwIDcsMTVIMTFWMTdIN0E1LDUgMCAwLDEgMiwxMkE1LDUgMCAwLDEgNyw3TTE3LDdBNSw1IDAgMCwxIDIyLDEySDIwQTMsMyAwIDAsMCAxNyw5SDEzVjdIMTdNOCwxMUgxNlYxM0g4VjExTTE3LDEySDE5VjE1SDIyVjE3SDE5VjIwSDE3VjE3SDE0VjE1SDE3VjEyWiIgZmlsbD0iI2ZmZmZmZjMzIi8+PC9zdmc+Cg==), linear-gradient(32deg, #6100fd, #5dbff3, #7be2f1, #f4fdff, #32c4ff, #6d5bff, #020562)",        filter: "drop-shadow(0px 0px 3px skyblue) brightness(1)",
        transform: "translateY(0px) scale(1) !important",
        transformOrigin: "center",
        transition: "all .25s ease-in-out 0s !important",
        fontWeight: "bold",
        fontSize: "26px",
        borderRadius: "64px",
        lineHeight: "3em",
        position: "fixed",
        width: 128,
        height: 128,
        zIndex: 7,
        bottom: 32,
        right: 32,
        [theme.breakpoints.down("sm")]: {
            fontSize: "14px",
            borderRadius: "32px",
            lineHeight: "1.5em",
            width: 64,
            height: 64,
            bottom: 24,
            right: 24,
        },
    },
    backgroundImage: {
        width: "100%",
        height: "100%",
        overflow: "hidden",
        "&:after": {
            content: "''",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
            position: "absolute",
            backdropFilter: "contrast(1.2) brightness(1.4) saturate(0.6)",
        },
        position: "relative",
        backgroundPosition: "0% 25vh",
        animation: "$slide 56s linear infinite",
        "@global": {
            "@keyframes slide": {
                "0%": {backgroundPosition: "-150% 25vh"},
                "20%": {backgroundPosition: "-50% 25vh"},
                "40%": {backgroundPosition: "50% 25vh"},
                "60%": {backgroundPosition: "150% 25vh"},
                "80%": {backgroundPosition: "225% 25vh"},
                "100%": {backgroundPosition: "300% 25vh"},
            }
        },
        backgroundRepeat: "no-repeat",
        backgroundOrigin: "border-box",
        padding: 64,
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(4)
        },
    },
    backgroundImageImage: {
        right: "max(25vw, 25vh)",
        bottom: "min(25vw, 25vh)",
        width: "max(50vw, 50vh)",
        zIndex: 3,
        position: "fixed",
        transform: "translate(min(50vh, 50%), min(50vh, 50%))",
        animation: "$fun 56s linear infinite",
        "@global": {
            "@keyframes fun": {
                "0%": {transform: "translate(calc(-70px + min(50vh, 50%)), calc(-50px + min(50vh, 50%)))"},
                "20%": {transform: "translate(calc(+30px + min(50vh, 50%)), calc(-10px + min(50vh, 50%)))"},
                "40%": {transform: "translate(calc(+50px + min(50vh, 50%)), calc(50px + min(50vh, 50%)))"},
                "60%": {transform: "translate(calc(+90px + min(50vh, 50%)), calc(30px + min(50vh, 50%)))"},
                "80%": {transform: "translate(calc(00px + min(50vh, 50%)), calc(-30px + min(50vh, 50%)))"},
                "100%": {transform: "translate(calc(-70px + min(50vh, 50%)), calc(-50px + min(50vh, 50%)))"},
            }
        },
    },
    card: {
        margin: theme.spacing(1, 2)
    },
    headerContainer: {
        fontFamily: `"Jura"`,
        position: "absolute",
        margin: "0px 48px",
        [theme.breakpoints.down("sm")]: {
            margin: "8px 24px"
        },
        zIndex: 5,
    },
    title: {
        whiteSpace: "break-spaces",
        fontSize: 48,
        fontWeight: "normal",
        [theme.breakpoints.down("sm")]: {
            fontSize: 32,
            lineHeight: "normal",
        },
    },
    titleSubTitle: {
        position: "fixed",
        bottom: 32,
        color: "white",
    },
    subtitle: {
        fontSize: 24,
        lineHeight: "1.5em",
        "& .emoji": {
            width: "2em",
            transform: "scale(1.5)"
        },
        fontWeight: "normal",
        [theme.breakpoints.down("sm")]: {
            fontSize: 16,
            display: "none",
        },
    },
    blue: {
        //color: theme.palette.primary.actionLighter,
        fontWeight: 600,
    },
});


class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            lc: props.lc,
            _history: HISTORY,
        };
    };

    componentDidMount() {

        function get_now_hours24_with_locale(lc) {

            const offset = UTC_OFFSET_PER_COUNTRIES[lc];
            const d = new Date(Date.now());
            const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
            const d2 = new Date(utc + (3600000*offset));

            return d2.getHours();
        }

        function is_night(lc) {

            const h = get_now_hours24_with_locale(lc);
            return Boolean(h < 20 && h > 8);
        }

        THEME_DESERT = is_night(this.state.lc);

        actions.trigger_loading_update(0);
        setTimeout(() => {

            actions.trigger_loading_update(100);
        }, 250);

        actions.trigger_music(`track_${navigator.onLine ? Math.ceil(Math.random() * 12).toString(10).padStart(2, "0"): "12"}`);
    }

    componentWillUnmount() {

        actions.stop_sound();
    }

    _go_to_url = (event, url) => {

        const { _history } = this.state;
        _history.push(url);
    };

    _handle_speed_dial_action = (event, action) => {

        switch (action) {

            case "share":
                actions.trigger_share();
                break;
        }
    };

    _open_link = (event, url) =>{

        window.open(url);
    };

    render() {

        const { classes, _quote } = this.state;

        return (
            <div className={classes.root} style={{
                backgroundImage: THEME_DESERT ?
                    "linear-gradient(to bottom, #2367ffcc 10%, transparent 33%), radial-gradient(farthest-corner at 10% 10%, rgb(109 215 232) 14%, rgb(97 197 255) 28%, rgb(0 72 255 / 10%) 50%, rgb(210 92 23 / 97%)), url(data:image/png;base64,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)" :
                    "linear-gradient(to bottom, #020082a3 10%, #04020200 33%), radial-gradient(farthest-corner at 10% 10%, #00000077 14%, rgb(158 170 255 / 44%) 28%, rgb(0 0 0 / 10%) 50%, rgb(0 0 0 / 88%)), url(data:image/png;base64,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)",
            }}>
                <div className={classes.insideRoot}>
                    <div className={classes.backgroundImage} style={{
                        backgroundSize: THEME_DESERT ? "175%": "50%",
                        backgroundColor: THEME_DESERT ? "#ff880033": "#353b693b",
                        backgroundImage: THEME_DESERT ?
                            "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5MTYgNDI2IiB3aWR0aD0iMTIyMS4zMzMiIGhlaWdodD0iNTY4IiB4bWxuczp2PSJodHRwczovL3ZlY3RhLmlvL25hbm8iPjxkZWZzPjxjbGlwUGF0aCBpZD0iQSI+PHBhdGggZD0iTTAgMGg5MTZ2NDI2SDB6Ii8+PC9jbGlwUGF0aD48L2RlZnM+PGcgY2xpcC1wYXRoPSJ1cmwoI0EpIj48ZyBmaWxsPSIjZmZlNzdjIj48cGF0aCBkPSJNNjM2LjgwNyA0MjUuOTZINDAuOTU3bDIxNC4xNy0zMDYuMjJMMzM4Ljg3NyAwbDYzLjc1IDkxLjE0IDIzNC4xOCAzMzQuODJoMHoiLz48cGF0aCBkPSJNNjEwLjc3OSAxMTUuOTZsLTIxNi44MjMgMzEwaDQzMy42NDZsLTIxNi44MjMtMzEwLTIxNi44MjMgMzEwaDQzMy42NDZsLTIxNi44MjMtMzEwaDB6Ii8+PC9nPjxnIGZpbGw9IiNmZmZlYjciPjxwYXRoIGQ9Ik0zMzguODc3IDBsNC45MyA4NS45Ni0xNi4yOTEgMTIzLjY5NXMxMzQuNTY3IDcwLjg0OCAxMzQuOTI5IDc0LjA3NmwtMjguMzQ3IDk0LjA2NSAyMDIuNzA5IDQ4LjE2NEwzMzguODc3IDB6bTI3MS45MDIgMTE1Ljk2bDM1LjM1MSA4My4xNzggNjIuNjc3IDEyNS44MjIgMzcuMTAyIDE4Ljk2OS0yLjI2NyAzMy4yNDcgODMuOTYgNDguNzg0LTIxNi44MjMtMzEweiIvPjwvZz48cGF0aCBkPSJNOTE1IDQyNS45NkgxYTEgMSAwIDEgMSAwLTJoOTE0YTEgMSAwIDEgMSAwIDJ6IiBmaWxsPSIjY2NjIi8+PGcgZmlsbD0iIzFmMWE1OSI+PHBhdGggZD0iTTUzOC43NjMgMTE2LjU4N2wxMi43OTUtMTAuMjMzYy05Ljk0LTEuMDk3LTE0LjAyNCA0LjMyNC0xNS42OTYgOC42MTUtNy43NjUtMy4yMjQtMTYuMjE4IDEuMDAxLTE2LjIxOCAxLjAwMWwyNS42IDkuMjk0Yy0xLjI5Mi0zLjQ0OS0zLjU0LTYuNDU5LTYuNDgxLTguNjc3em0xNi41ODMtNzkuNzU4bDEyLjc5NS0xMC4yMzRjLTkuOTM5LTEuMDk2LTE0LjAyNCA0LjMyNS0xNS42OTUgOC42MTUtNy43NjUtMy4yMjQtMTYuMjE5IDEuMDAyLTE2LjIxOSAxLjAwMmwyNS42IDkuMjkzYy0xLjI5MS0zLjQ0OS0zLjUzOS02LjQ1OS02LjQ4MS04LjY3Nmgwem0yOTEuMzc1IDE3MC41MDhsMTIuNzk1LTEwLjIzNGMtOS45NC0xLjA5Ni0xNC4wMjQgNC4zMjUtMTUuNjk2IDguNjE1LTcuNzY1LTMuMjI0LTE2LjIxOCAxLjAwMi0xNi4yMTggMS4wMDJsMjUuNiA5LjI5M2MtMS4yOTItMy40NDktMy41NC02LjQ1OS02LjQ4MS04LjY3Nmgwem0tMTUuOTU3IDMzLjA0bDEyLjc5NS0xMC4yMzRjLTkuOTQtMS4wOTYtMTQuMDI0IDQuMzI1LTE1LjY5NSA4LjYxNS03Ljc2Ni0zLjIyNC0xNi4yMTkgMS4wMDItMTYuMjE5IDEuMDAybDI1LjYgOS4yOTNhMTkuMzcgMTkuMzcgMCAwIDAtNi40ODEtOC42NzZoMHpNMTI0LjExOSAzNi44MjlsMTIuNzk1LTEwLjIzNGMtOS45NC0xLjA5Ni0xNC4wMjQgNC4zMjUtMTUuNjk1IDguNjE1QzExMy40NTMgMzEuOTg2IDEwNSAzNi4yMTIgMTA1IDM2LjIxMmwyNS42IDkuMjkzYTE5LjM3IDE5LjM3IDAgMCAwLTYuNDgxLTguNjc2aDB6bS01NSA5Ny41MDhsMTIuNzk1LTEwLjIzNGMtOS45NC0xLjA5Ni0xNC4wMjQgNC4zMjUtMTUuNjk1IDguNjE1QzU4LjQ1MyAxMjkuNDk0IDUwIDEzMy43MiA1MCAxMzMuNzJsMjUuNiA5LjI5M2ExOS4zNyAxOS4zNyAwIDAgMC02LjQ4MS04LjY3Nmgwem01NzguMzU1LTEzLjU1NmwxMi43OTUtMTAuMjMzYy05Ljk0LTEuMDk3LTE0LjAyNCA0LjMyNC0xNS42OTUgOC42MTUtNy43NjYtMy4yMjUtMTYuMjE5IDEuMDAxLTE2LjIxOSAxLjAwMWwyNS42IDkuMjk0YTE5LjM4IDE5LjM4IDAgMCAwLTYuNDgxLTguNjc3aDB6Ii8+PC9nPjwvZz48L3N2Zz4=)":
                            "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1OTAgNTc1IiB3aWR0aD0iNzg2LjY2NyIgaGVpZ2h0PSI3NjYuNjY3IiB4bWxuczp2PSJodHRwczovL3ZlY3RhLmlvL25hbm8iPjxkZWZzPjxjbGlwUGF0aCBpZD0iQSI+PHBhdGggZD0iTTAgMGg1OTB2NTc1SDB6Ii8+PC9jbGlwUGF0aD48L2RlZnM+PGcgY2xpcC1wYXRoPSJ1cmwoI0EpIj48Y2lyY2xlIHZlY3Rvci1lZmZlY3Q9Im5vbi1zY2FsaW5nLXN0cm9rZSIgY3g9IjQzMS40MTgiIGN5PSI4OC43MjMiIHI9Ijg4LjIwMSIgZmlsbD0iI2MxYmRmZiIvPjxwYXRoIGQ9Ik01ODguNTMgMzMwLjk0MXEtMS4xNDUtNS45MTMtMi4zNTgtMTEuNjY2bC0uMDEyLS4wMTF2LS4wMDFjLTEwLjIzMS00OC41NDctMjQuMDE3LTg4LjM1Ni00MC4zNDQtMTIwLjgyN2wtNDMuMjYtMTQuODggMzIuNjA4LTQuNjZjMy4yNTctMzcuNDg2IDMuMTEyLTY5LjAzNC00My4xNDctNTUuNTU0bC03OS40NTggOS4wODEgNTkuOTc1LTI1LjcwNGMtMTY4Ljc3NS0xODAuNjU1LTI4Ni45NjEtNzAuMTMxLTI5NC4wOTggNC42MTQtNS40MDEgMi44Ni04LjgxOSA0Ljg3Ny05LjkxMyA1LjUyNi0uMDExIDAtLjAxMSAwLS4wMjIuMDEybC0uMzU0LjIxNiAyMi4zNTQgMTEuNjFoLjAxMmwzOTYuOTkyIDIwNi4yMDkgMS4wMjUtMy45NjV6IiBmaWxsPSIjNmM2M2ZmIi8+PGcgZmlsbD0iIzNmM2Q1NiI+PHBhdGggZD0iTTU4OC41MyAzMzAuOTQxcS43NjktMy4wNTkgMS40Ny02LjEyOWwtMy44MjgtNS41MzctLjAxMi0uMDExdi0uMDAxQzQ4Ny4yNzYgMjk4LjA0OCA0MTEuODU1IDQxLjU0NCAxNzkuMjkgMTEyLjUzaC0uMDExcS01LjM2NyAyLjAxNi0xMC43NTYgNC4zMjljLS4wMTEgMC0uMDExIDAtLjAyMi4wMTJxLTQuOTA1IDIuMTAyLTkuODIyIDQuNDY2bC00Ljk3OSAyLjQzOC00LjMyOSAyLjIzM3MtOC4yMjYgMi4wNjItMTcuNDQzIDkuODMzYy0xOC4xMDUgMTUuMjktNDAuMDQ4IDUyLjY0OS0xMC45NzIgMTM5Ljg3NyAwIDAgMjUuODE3IDcyLjI2OCAxMi45MDggMTA1LjgzMy0xMi45MDggMzMuNTQyIDY3LjEzIDcyLjI1NyA5MC4zMzkgMC0xOC4wMTYtODQuODc1IDE5LjgxNS0xNDUuMzg2IDMwLjk5LTE0MS45NzMgNDUuNzI3LTEzLjI4NiA1OC45NDQgNDYuOTA1IDI0LjA3NCAxMTIuNzAzIDMyLjgxNyAxMC45MDIgNTIuNjk2IDI3LjYyNiA3LjIxMiA2OC41NTVsMi4wMjggNy4wNDFjMjkuNjM2IDYuNTE0IDY2LjE2OCAxOC44NjkgNDAuOCA5OS41NTUgMjQuMTAxIDIuNTM1IDMzLjE4NyAxOS43ODEgMzEuMzc4IDQ3LjU2OCAxNS40NDItNS4wMTggNzUuNDY4LTE0My40MTcgOTAuMDM1LTE1MC41OSA4OS44MDgtNDQuMTYyIDExMS4xMzEgNy4yMzIgMTM2Ljc4NS04OS41MDRsMS4wMjUtMy45NjV6Ii8+PHBhdGggZD0iTTE1Ny4xMDQgMTUxLjgyMWwtMTAuMzI1LTg1LjE3OCA0My44OCA2MS45NDctMzMuNTU1IDIzLjIzMWgweiIvPjxwYXRoIGQ9Ik0xMzQuNjA1IDE1Ny45NTdMMTI0LjI4IDcyLjc3OWw0My44OCA2MS45NDctMzMuNTU1IDIzLjIzMWgweiIvPjwvZz48cGF0aCBkPSJNMTEyLjEzIDIzNy4zMjhMMS44ODMgOTQuMDI3YzU1LjE1NyAxNi4zMjUgMTA3LjM5MiAzNS40MzUgMTExLjY1NiAxMDAuMjYybC0xLjQwOSA0My4wMzl6IiBmaWxsPSIjNmM2M2ZmIi8+PC9nPjwvc3ZnPg==)",
                    }}>
                        <Fade in={true} timeout={600}><img src={THEME_DESERT ? "/src/images/fun.svg": "/src/images/rocket_boy.svg"} className={classes.backgroundImageImage}/></Fade>
                    </div>
                </div>
                <div className={classes.headerContainer} style={{color: THEME_DESERT ? "#000000dd": "#ffffffdd"}}>
                    <h1 className={classes.title}>
                        <Fade in={true} timeout={700}><span style={{fontSize: "1.314em"}}><span style={{color: "white", fontWeight: "bold"}}>PIXA.PICS : </span>Load a matrix of pixels.<br />Then, draw, and vectorize art.</span></Fade><br />
                        <Fade in={true} timeout={850}><span className={classes.titleSubTitle} style={{fontSize: ".618em"}}>Make potential (un)limited everywhere <img src={ANGELEMOJI} className="emoji"/>.</span></Fade>
                    </h1>
                    <Fade in={true} timeout={1200}>
                        {
                            SUBTITLE_STILL ?
                                <h2 className={classes.subtitle}>
                                    <span  style={{color: THEME_DESERT ? "#0d1fac": "#6396ff"}}>In your images,</span> a plethora of too many harmful details without a <b>useless simplicity</b>? <br />
                                    <b>Guess what?</b> The lull of difficult <span  style={{color: THEME_DESERT ? "#0d1fac": "#6396ff"}}>pixel art is not difficult.</span> <br />
                                    – Easy and useful simplicity of color range reduction and vectorization of size, clear, crisp,<br/> and in line with powerful advanced tools.
                                </h2> :
                                <h2 className={classes.subtitle}>
                                    In a new AEON of the <span  style={{color: THEME_DESERT ? "#0d1fac": "#6396ff"}}>matrix</span> and <span  style={{color: THEME_DESERT ? "#0d1fac": "#6396ff"}}>vector</span> universes of PICS : <br/>
                                    CONVERT them and then, DRAW <img className={"emoji"} style={{width: "2em"}} src={DRAWEMOJI}/> and <img className={"emoji"} style={{width: "2em"}} src={MAGICKEMOJI}/> EDIT it.<br />
                                    ANY pixel art can generate ∞ SVGs paintings.<br />
                                    MADE with <img style={{width: "3em"}} className={"emoji pulse2"} src={HEARTHEMOJI}/>, just designed to be : <br />
                                    <br />
                                </h2>
                        }
                    </Fade>
                    <Fade in={true} timeout={1500}>
                        <Button className={classes.homeCTAuseit} variant={"contained"} size={"large"} color="primary" onClick={(event) => this._go_to_url(event, "/pixel")}>
                            OPEN PIXEL LAB.
                        </Button>
                    </Fade>
                    <Fade in={true} timeout={2000}>
                        <p style={{color: THEME_DESERT ? "#d8ab06": "#ffe66b", fontWeight: "bold", fontSize: "16px"}}>For Everyone – For Free – Forever Open-Source!</p>
                    </Fade>
                    <Grow in={true} timeout={1900}>
                        <Button className={classes.homeCTAsendit} variant={"contained"} size={"large"} color="primary" onClick={(event) => {this._handle_speed_dial_action(event, "share")}}>
                            SHARE
                        </Button>
                    </Grow>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Home);
