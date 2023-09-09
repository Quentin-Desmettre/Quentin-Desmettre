import React from 'react'
import InfoImage from '../../../assets/titles/info.png'
import Title from '../../../components/common/Title'
import MyFace from '../../../assets/my_face.png'
import Download from '../../../assets/download.png'
import { extractFirstNWords } from '../../../utils/Strings'
import HoverableTextLink from '../../../components/common/HoverableTextLink'
import Box from '../../../components/common/Box'
import CV from '../../../assets/cv.pdf'
import { downloadTxtFile } from '../../../utils/files'

const AboutMe = ({ language, destRef }) => {
    const texts = language.texts.about_me;
    const [firstTwoWords, restOfTheText] = extractFirstNWords(texts.description, 2)

    return (
        <div ref={destRef}>
            <Title title={texts.title} image={InfoImage} color="purple" topBorder={false} />
            <Box className="flex px-8 py-4">
                <div className='flex flex-col ml-6'>
                    <div className="h-5/6 flex items-center">
                        <span className="text-xl text-grey">
                            <span className='font-bold text-white'>{firstTwoWords}</span>
                            {restOfTheText}
                        </span>
                    </div>

                    <button onClick={() => {downloadTxtFile(CV, "CV Quentin Desmettre.pdf")}} className='w-fit mb-10 font-bold flex items-center'>
                        <div className="p-2 bg-purple rounded-lg mr-3 w-10 h-10 flex items-center justify-center">
                            <img src={Download} alt="Download" className="w-full" />
                        </div>
                        <HoverableTextLink className="text-purple" underlineColor={"bg-purple"}>
                            {texts.cv_link}
                        </HoverableTextLink>
                    </button>
                </div>
                <img src={MyFace} alt="My face" className="rounded-2xl w-60" />
            </Box>
        </div>
    )
}

export default AboutMe
