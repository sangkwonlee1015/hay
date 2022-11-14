import React from 'react'

function Test() {
    //해당 파일 이름을 백앤드에서 받아옴 
    const fileName = "cb801030-70b3-4be2-bff0-af9308155e2b";

    return (
        <div>
           <label htmlFor="upload" className="image-upload-wrapper">
            <img className="profile-img" 
                src={`https://dangdang-bucket.s3.ap-northeast-2.amazonaws.com/hay/vote/${fileName}.jpg`} 
                alt="업로드 이미지" />
            </label>
        </div>
    );
}

export default Test