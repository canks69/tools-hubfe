import {FaHome} from "react-icons/fa";
import {MdJoinInner} from "react-icons/md";
import {FaDownload} from "react-icons/fa6";
import {FiSearch} from "react-icons/fi";
import {IoCloseOutline} from "react-icons/io5";

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export const HomeIcon = ({size = 24, color = 'black', className = ''}: IconProps) => {
  return (
    <FaHome size={size} color={color} className={className}/>
  )
}

export const MargerIcon = ({size = 24, color = 'black', className = ''}: IconProps) => {
  return (
    <MdJoinInner size={size} color={color} className={className}/>
  )
}

export const DownloadIcon = ({size = 24, color = 'black', className = ''}: IconProps) => {
  return (
    <FaDownload size={size} color={color} className={className}/>
  )
}

export const SearchIcon = ({size = 24, color = 'black', className = ''}: IconProps) => {
  return (
    <FiSearch size={size} color={color} className={className}/>
  )
}

export const CloseIcon = ({size = 24, color = 'black', className = ''}: IconProps) => {
  return (
    <IoCloseOutline size={size} color={color} className={className}/>
  )
}