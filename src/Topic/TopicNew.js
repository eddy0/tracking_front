import React from 'react';
import './TopicNew.css'

function TopicNew(props) {
    return (

        <div className="main">
            <section className="main-title">
                {/*<input type="file" class="title-img" />*/}
                <input type="text" className="title-content" name="title" placeholder="Input the Title" />


                    <div className="tag-content">
                        <span className="tag-header">Select A Tag&nbsp;:</span>
                        <div className="tag-list">
                            <span className="tag-item "> {'tag.title'}</span>

                        </div>
                        <div className="tag-hint ">
                            <span>At Least One Tag</span>
                        </div>

                    </div>


            </section>
            <section className="main-textarea">

                <div className="text-container" contentEditable={true} />
            </section>
            <div className="footer">
                <button className="wd-topic-btn wd-topic-submit ">Submit</button>
                {/*<button class="wd-topic-btn wd-topic-save  ">Save</button>*/}
            </div>
        </div>
);
}

export default TopicNew;