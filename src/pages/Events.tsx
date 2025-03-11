import { useState } from 'react';
import { Event } from '../types';
import { format } from 'date-fns';

const initialEvents: Event[] = [
  {
    id: '1',
    title: 'Interfaith Dialog Session',
    date: '2024-03-20',
    location: 'Community Center',
    description: 'Join us for an evening of meaningful dialogue between different faith communities.',
    category: 'Religious'
  },
  {
    id: '2',
    title: 'Community Food Drive',
    date: '2024-03-25',
    location: 'Local Food Bank',
    description: 'Help us collect and distribute food to those in need in our community.',
    category: 'Charity'
  }
];

export default function Events() {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    category: 'Social' as Event['category']
  });

  const filteredEvents = selectedCategory === 'all'
    ? events
    : events.filter(event => event.category === selectedCategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const event: Event = {
      id: String(Date.now()),
      ...newEvent
    };
    setEvents([...events, event]);
    setNewEvent({
      title: '',
      date: '',
      location: '',
      description: '',
      category: 'Social'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Filter Section */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Filter by Category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="all">All Categories</option>
            <option value="Religious">Religious</option>
            <option value="Social">Social</option>
            <option value="Charity">Charity</option>
          </select>
        </div>

        {/* Events List */}
        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
              <div className="mt-2 text-sm text-gray-500">
                <p>Date: {format(new Date(event.date), 'MMMM d, yyyy')}</p>
                <p>Location: {event.location}</p>
                <p>Category: {event.category}</p>
                <p className="mt-2">{event.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Add Event Form */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Add New Event</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                id="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                id="location"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                value={newEvent.category}
                onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value as Event['category'] })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="Religious">Religious</option>
                <option value="Social">Social</option>
                <option value="Charity">Charity</option>
              </select>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                required
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}