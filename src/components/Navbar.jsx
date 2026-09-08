import React from 'react'
import ThemeToggleButton from './ThemeToggleButton'

const Navbar = () => {
  return (
    <nav className='w-full z-40 py-1'>
        <div className='container w-full rounded-lg flex items-center justify-between'>
            <div className='flex items-center justify-around gap-10'>
                <span>
                    <span>LOGO</span>
                </span>
                <span className='bg-border'>Untitled</span>
            </div>

            <div className='flex items-center justify-around gap-5'>
                <div className='rounded-full'>
                <ThemeToggleButton />
                {/* <ThemeToggle /> */}
                </div>
                {/* <div className='cosmic-button hover:bg-border bg-panel'>Save</div> */}
                <div className='cosmic-button hover:bg-border bg-background text-accent border-accent border'>Save</div>
                <div className='cosmic-button text-background'>Run</div>
                <div className='rounded-full h-8 w-8 bg-green-400'></div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar