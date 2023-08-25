import React from 'react'
import InfoImage from '../../../assets/info.png'
import Title from '../../common/Title'
import MyFace from '../../../assets/my_face.png'
import Download from '../../../assets/download.png'
import { firstNWords } from '../../../utils/Strings'
import HoverableTextLink from '../../common/HoverableTextLink'

const AboutMe = ({ language }) => {
    const texts = language.texts.about_me;
    const firstTwoWords = firstNWords(texts.description, 2)
    const restOfTheText = texts.description.replace(firstTwoWords, '')

    return (
        <>
            <Title title={texts.title} image={InfoImage} shadowColor="purple" />
            <Box className="flex px-8 py-4">
                <div className='flex flex-col ml-6'>
                    <div className="h-5/6 flex items-center">
                        <span className="text-xl text-grey">
                            <span className='font-bold text-white'>{firstTwoWords}</span>
                            {restOfTheText}
                        </span>
                    </div>

                    <a href="www.google.com" target='blank' className='mb-10 font-bold flex items-center content-start'>
                        <div className="p-2 bg-purple rounded-lg mr-3 w-10 h-10 flex items-center justify-center">
                            <img src={Download} alt="Download" className="w-full" />
                        </div>
                        <HoverableTextLink className="text-blue" underlineColor={"bg-blue"}>
                            {texts.cv_link}
                        </HoverableTextLink>
                    </a>
                </div>
                <img src={MyFace} alt="My face" className="rounded-2xl w-60" />
            </Box>
        </>
    )
}

export default AboutMe
