import React from 'react'
import { Input} from 'semantic-ui-react'
import './index.css'
class My extends React.Component {
    render() {
        return (
            <div className='main-container'>
                <div className='main-searchbar'>
                    <Input fluid icon='search' placeholder='请输入关键词' />
                </div>
            </div>
        )
    }
}

export default My