//
//  MessageCollectionViewCell.swift
//  TeamHome
//
//  Created by Daniela Parra on 1/10/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Apollo
import Cloudinary

class MessageCollectionViewCell: UICollectionViewCell {
    
    // Set up message collection view cell with message details
    private func updateViews() {
        
        updateUI()
        
        guard let message = message else { return }
        
        // Update all labels with message's details
        firstNameLabel.text = message.user.firstName
        lastNameLabel.text = message.user.lastName
        messageTitleLabel.text = message.title
        messageBodyLabel.text = message.content
        dateLabel.text = ""
        
        // Show image attachment icon if images are included in message
        if let images = message.images {
            if images.count > 0 {
                imageAttachmentIconImageView.isHidden = false
                imageAttachmentIconImageView.tintColor = .white
            } else {
                imageAttachmentIconImageView.isHidden = true
            }
        } else {
            imageAttachmentIconImageView.isHidden = true
        }
        
        // Display number of comments in message or hides count if no comments
        if let comments = message.comments {
            if comments.count > 0 {
                commentCountLabel.text = "\(comments.count)"
                commentIconImageView.isHidden = false
                commentIconImageView.tintColor = .white
            } else {
                commentCountLabel.isHidden = true
                commentIconImageView.isHidden = true
            }
        }
        
        // Download image and display as user avatar string of image url
        guard let avatar = message.user.avatar else { return }
        
        // Use cloudinary to fetch image because using their image hosting service
        cloudinary.createDownloader().fetchImage(avatar, { (progress) in
            // Show progress bar for download
            
        }) { (image, error) in
            if let error = error {
                print("\(error)")
            }
            
            guard let image = image else { return }
            
            DispatchQueue.main.async {
                self.userAvatarImageView.image = image
            }
        }
    }
    
    private func updateUI() {
        self.contentView.layer.cornerRadius = 6
        self.contentView.clipsToBounds = true
        self.layer.cornerRadius = 6
        self.clipsToBounds = true
        
    }
    
    // MARK - Properties
    
    var message: FindMessagesByTeamQuery.Data.FindMessagesByTeam? {
        didSet {
            self.updateViews()
        }
    }
    
    // All IBOutlets in message collection view cell
    @IBOutlet weak var userAvatarImageView: UIImageView!
    @IBOutlet weak var firstNameLabel: UILabel!
    @IBOutlet weak var lastNameLabel: UILabel!
    @IBOutlet weak var messageTitleLabel: UILabel!
    @IBOutlet weak var messageBodyLabel: UILabel!
    @IBOutlet weak var dateLabel: UILabel!
    @IBOutlet weak var imageAttachmentIconImageView: UIImageView!
    @IBOutlet weak var commentCountLabel: UILabel!
    @IBOutlet weak var commentIconImageView: UIImageView!
    
}
