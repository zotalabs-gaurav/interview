import React, { useState } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
    savePostData
} from '../../store/actions/index'
import axios from 'axios';
const CancelToken = axios.CancelToken;
let cancel;

export let enhancer = compose(
    connect(
        ({ postData }) => ({
            searchedData: postData.data,
        }),
        dispatch => ({
            setSearchedData: (data) => dispatch(savePostData(data)),
        })
    ),
    SearchEngine => ({
        searchedData,
        setSearchedData,
        ...props
    }) => {
        const [suggestion, setSuggestion] = useState([]);
        const [searchCount, setSearchCount] = useState(false);
        
        const getPostData = (search = "", view) => {
            if (cancel !== undefined) {
                cancel();
            }
            axios.get(`http://localhost:8080/posts?q=${search}`, {
                cancelToken: new CancelToken(function executor(c) {
                    cancel = c;
                }),
            })
                .then((response) => {
                    if (view) {
                        setSearchedData(response.data)
                    } else {
                        setSuggestion(response.data);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    if (axios.isCancel(err)) {
                        console.log("post Request canceled");
                    } else {
                        setSuggestion([]);
                        setSearchedData([])
                    }
                })
        }
        const onChangeText = (e) => {
            if (e.target.value) {
                getPostData(e.target.value, false);
            } else {
                setSuggestion([]);
            }
        }
        const onSuggestionClick = (e, title) => {
            setSuggestion([]);
            console.log(title);
            getPostData(title, true)
            setSearchCount(true);
        }
        const onSubmit = (e) => {
            e.preventDefault();
            if (e.target[0].value) {
                setSearchCount(true);
                setSuggestion([]);
                getPostData(e.target[0].value, true)
            }
        }
        return (
            <SearchEngine
                {...props}
                {...{
                    onChangeText,
                    searchedData,
                    suggestion,
                    onSuggestionClick,
                    onSubmit,
                    searchCount,
                }}
            />
        )
    })

export default enhancer
