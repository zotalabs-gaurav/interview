import enhancer from "./enhancer";
import { DebounceInput } from 'react-debounce-input';
import React, { Fragment } from "react";
import MaterialTable from "material-table";
import './style.css'
const SearchMe = (props) => {
    let {
        onChangeText,
        searchedData,
        suggestion,
        onSuggestionClick,
        onSubmit,
        searchCount,
    } = props;
    const columns = [
        { title: "Title", field: "title" },
        { title: "Description", field: "description" },
        { title: "Time", field: "timestamp" },
    ];

    return (
        <Fragment>
            <div>
                Enter the text here to search:{' '}
                <form onSubmit={onSubmit}>
                    <DebounceInput
                    className="inputField"
                        minLength={3}
                        name={'search'}
                        autocomplete="off"
                        debounceTimeout={300}
                        onChange={(e) => onChangeText(e)}
                    />
                </form>
                    <div className="suggestion">
                        {suggestion.map((elem) => (<div key={elem.id} onClick={(e) => onSuggestionClick(e, elem.title)}>{elem.title}</div>))}
                    </div>
                <br />
            </div>{
                (searchedData.length > 0 || searchCount) &&
                <div className="searchResult">
                    <MaterialTable
                        title="Data preview"
                        columns={columns}
                        data={searchedData}
                        options={{
                            search: false,
                            sorting: true
                        }}
                        Container="none"
                    />
                </div>
            }
        </Fragment>
    );
}

export default enhancer(SearchMe);
