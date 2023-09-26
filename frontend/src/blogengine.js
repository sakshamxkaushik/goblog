
import React, {Component} from "react";
import axios from "axios";
import { Cards, Header, Form, Button, Container, Icon, Grid, Image, Segment, Divider, List, Label, Menu, Table, Message, Input, TextArea, Select, Dropdown, Modal } from "semantic-ui-react";

let endpoint = "http://localhost:8000/api/blogengine/";
class Blogengine extends Component{
    constructor(props){
        super(props);
        this.state = {
            Blog: [],
            categories: [],
            BlogTitle: "",
            BlogContent: "",
            BlogAuthor: "",
            Date: "",
            CreateBlogwithai: "",
        };
        this.get



}