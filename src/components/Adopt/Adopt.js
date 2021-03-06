import React, { Component } from 'react'
import ApiService from '../../services/ApiService'
import Cats from './Cats/Cats'
import Dogs from './Dogs/Dogs'
import People from './People/People'
import './Adopt.css'
export default class AdoptionPage extends Component {

    state = {
        cats: {
            value: {},
            next: {}
        },
        dogs: {
            value: {},
            next: {}
        },
        people: [],
        user: "",
        front: "",
        submitted: false
    }

    componentDidMount() {
        ApiService.getCats()
            .then(cats => {
                this.setState({ cats })
            })

        ApiService.getDogs()
            .then(dogs => {
                this.setState({ dogs })
            })

        ApiService.getPeople()
            .then(people => {
                this.setState({ people: people, front: people[0] })
            })

        this.interval = setInterval(() => {
            console.log(this.state.user)
            if (this.state.front !== this.state.user)
                this.next();
        }, 3000);

    }

    next() {
        let functions = [this.adoptCat, this.adoptDog]
        function adoptRandom(n) {
            return Math.floor(Math.random() * n);
        }
        functions[adoptRandom(functions.length)]()
    }

    adoptCat = () => {
        ApiService.adoptCat()
        ApiService.getPeople()
            .then(people => {
                this.setState({ people: people, front: people[0] })
            })
        ApiService.getCats()
            .then(cats => {
                this.setState({ cats })
            })
    }

    adoptDog = () => {
        ApiService.adoptDog()
        ApiService.getPeople()
            .then(people => {

                this.setState({ people: people, front: people[0] })
            })
        ApiService.getDogs()
            .then(dogs => {
                this.setState({ dogs })
            })
    }

    getInLine = (e) => {
        e.preventDefault()
        this.setState({ user: e.target.value })

    }

    handleSubmit = (e) => {
        e.preventDefault()
        ApiService.addPeople(this.state.user)
        ApiService.getPeople()
        this.setState({ submitted: true })
        alert(`${this.state.user} was added to the back of the line!`)
    }

    resetUser = () => {
        alert('You have adopted a new furry friend! Have a great day!')
        ApiService.deletePeople()
        const blank = ""
        this.setState({ user: blank, submitted: false })
    }



    render() {
        const { cats, dogs, people, user, front } = this.state
        return (
            <>
                <section className='AdoptionPage'>
                    <div className="pets">
                        {!cats.next ? <p>Rescuing Cats...</p> :
                            <div className='cat'>
                                <Cats
                                    cats={cats}
                                    adopt={this.adoptCat}
                                    reset={this.resetUser}
                                    user={user}
                                    front={front}
                                />
                            </div>}
                        {!dogs.next ? <p>Rescuing Dogs...</p> :
                            <div className='dog'>
                                <Dogs
                                    dogs={dogs}
                                    adopt={this.adoptDog}
                                    reset={this.resetUser}
                                    user={user}
                                    front={front}
                                />
                            </div>}
                    </div>
                    <div className="front">
                        <h3>First in line: {front}</h3>
                    </div>
                    <div className='People'>
                        {people.slice(1, 6).map((person, index) =>
                            <People
                                key={index}
                                number={index}
                                person={person}
                            />)}
                        {this.state.submitted ? <p></p> :
                            <form className="form" onSubmit={this.handleSubmit}>
                                <label htmlFor="name">Enter your name below to join the line:</label>
                                <br />
                                <input onChange={this.getInLine} type="text" placeholder="Name goes here" name="name" id="name"></input>
                                <input type="submit" value="Get in line"></input>
                            </form>}
                    </div>
                </section>
            </>
        )
    }
}