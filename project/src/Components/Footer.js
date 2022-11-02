import React from 'react'
import {IoLogoInstagram} from 'react-icons/io5'
import {RiTwitterLine} from 'react-icons/ri'
import {MdOutlineAttachEmail} from 'react-icons/md'
function Footer() {
    return (
        <div className='text-center footer'>
            <h6>
                Copyright Reserved 2022
            </h6>
            <h6>Contact Us at <a><IoLogoInstagram />  <RiTwitterLine /> < MdOutlineAttachEmail/></a></h6>
        </div>
    )
}

export default Footer